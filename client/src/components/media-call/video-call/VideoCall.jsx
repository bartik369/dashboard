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

export default function VideoCall({ callWindow, setCallWindow }) {

  const {activeConversationUserId} = useContext(CallContext)
  const user = useSelector(selectCurrentUser);
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
      socket.emit("setMyId", { userId: user.id });
  }, [user])
 
  useEffect(() => {
    if (callWindow) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    }
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, [callWindow]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
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
              from: "from user",
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
    setCallWindow(false)
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div className="call-window__inner">
      <h5>Video chat</h5>
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
        me={me}
        callAccepted={callAccepted}
        name={name}
        setName={setName}
        leaveCall={leaveCall}
        callEnded={callEnded}
        callUser={callUser}
      />
      {/* <div className={inCall ? "call-notification" : "all-notification-turnoff"}> */}
      <Notifications
        answerCall={answerCall}
        call={call}
        callAccepted={callAccepted}
        setCallWindow={setCallWindow}
      />
      {/* </div> */}
    </div>
  );
}
