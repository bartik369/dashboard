import React, { useEffect, useState, useRef, useContext } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import VideoPlayer from "./VideoPlayer";
import Options from "./Options";
import Notifications from "./Notifications";
import '../../media-call/call.css'
import { CallContext } from "./CallContext";

const socket = io.connect("http://localhost:5001/");

export default function VideoCall() {

  const {
    activeConversationUserId, 
    callWindow, 
    setCallWindow, 
    callNotification, 
    setCallNotification} = useContext(CallContext)
  const user = useSelector(selectCurrentUser);
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef()

  useEffect(() => {

    if (callWindow) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    }
    socket.emit("setMyId", { userId: user.id });
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, [callWindow]);
  
  useEffect(() => {

    if ( call.isReceivedCall && !callAccepted) {
      setCallNotification(true)
    }
  }, [call])

  useEffect(() => {

      if (callAccepted) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        if (myVideo.current) {
          myVideo.current.srcObject = stream
          const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on("signal", (data) => {
          socket.emit("answercall", { signal: data, to: call.from });
        }); 
        peer.on("stream", () => {

          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
        }
      })
      }
  }, [callAccepted])

  const answerCall = () => {
    setCallWindow(true)
    setCallAccepted(true)
    setCallNotification(false)
  };

  const callUser = () => {  
    const peer = new Peer({ initiator: true, trickle: false, stream });

    if (activeConversationUserId) {
      socket.emit("reqRecipentSocketId", {recipientId: activeConversationUserId});
      socket.on('resRecipentSocketId', (socketId) => {
        
         if (socketId) {
          peer.on("signal", (data) => {
            socket.emit("calluser", {
              userToCall: socketId.socketData,
              signalData: data,
              from: socket.id,
              name,
            });
          });
         }
      })
    }
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };


  const leaveCall = () => {
    console.log("leeeeeave")
    setCallWindow(false)
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <>
   { callWindow && <div className="call-window__inner">
      <VideoPlayer
        stream={stream}
        name={name}
        callAccepted={callAccepted}
        myVideo={myVideo}
        userVideo={userVideo}
        call={call}
        callEnded={callEnded}
      />
      <Options
        callAccepted={callAccepted}
        name={name}
        setName={setName}
        leaveCall={leaveCall}
        callEnded={callEnded}
        callUser={callUser}
      />
    </div>}
      <div  className={callNotification ? "call-notification" : "call-notification-turnoff"}>
        {
         <Notifications
         answerCall={answerCall}
         call={call}
       />}
      </div>
   
    </>
  );
}
