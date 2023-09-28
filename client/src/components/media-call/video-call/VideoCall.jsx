import React, { useEffect, useState, useRef, useContext } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import VideoPlayer from "./VideoPlayer";
import Options from "./Options";
import Notifications from "./Notifications";
import "../../media-call/call.css";
import { CallContext } from "./CallContext";

const socket = io.connect("http://localhost:5001/");

export default function VideoCall() {
  const {
    activeConversationUserId,
    callWindow,
    setCallWindow,
    callNotification,
    setCallNotification,
  } = useContext(CallContext);
  const user = useSelector(selectCurrentUser);
  const [stream, setStream] = useState(null);
  const [audioMute, setAudioMute] = useState(false)
  const [videoMute, setVideoMute] = useState(false)
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();



  useEffect(() => {
    socket.emit("setMyId", { userId: user.id });
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  
  }, []);

  useEffect(() => {

    if (callWindow) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
          myVideo.current.srcObject = stream;
      });
    }
  }, [callWindow])

  useEffect(() => {
    if (call.isReceivedCall && !callAccepted) {
      setCallWindow(true)
      setCallNotification(true);
    }
  }, [call]);
  
  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    if (activeConversationUserId) {
      socket.emit("reqRecipentSocketId", {
        recipientId: activeConversationUserId,
      });
      socket.on("resRecipentSocketId", (socketId) => {
        
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

        peer.on('stream', (stream) => {
          userVideo.current.srcObject = stream;
        });
      });
    }
    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true)
    setCallNotification(false);
    setCallWindow(true);

    const peer = new Peer({ initiator: false, trickle: false, stream})

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream
    });
  
    peer.signal(call.signal);
    connectionRef.current = peer;
      
  }

  const leaveCall = () => {
    setCallWindow(false);
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const videoHandler = () => {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    setVideoMute(!videoMute)
  };
  const audioHandler = () => {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    setAudioMute(!audioMute)
  };

  console.log(videoMute)
  console.log(audioMute)


  return (
    <>
      {callWindow && (
        <div className="call-window__inner">
          <div className="video-layer">
            <VideoPlayer
              name={name}
              callAccepted={callAccepted}
              myVideo={myVideo}
              userVideo={userVideo}
              call={call}
              callEnded={callEnded}

            />
          </div>
          <div className="video-options">
          <Options
              videoHandler={videoHandler}
              audioHandler={audioHandler}
              callAccepted={callAccepted}
              name={name}
              setName={setName}
              leaveCall={leaveCall}
              callEnded={callEnded}
              callUser={callUser}
              audioMute={audioMute}
              videoMute={videoMute}
            />
          </div>
        </div>
      )}
      <div
        className={callNotification ? "call-notification" : "call-notification-turnoff"}>
        {<Notifications answerCall={answerCall} call={call} />}
      </div>
    </>
  );
}