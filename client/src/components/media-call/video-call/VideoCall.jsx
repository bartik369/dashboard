import React, { useEffect, useState, useRef } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import VideoPlayer from "./VideoPlayer";
import Options from "./Options";
import Notifications from "./Notifications";
import { useGetSocketQuery } from "../../../store/features/messenger/messengerApi";
import '../../media-call/call.css'

const socket = io.connect("http://localhost:5001/");

export default function VideoCall({ callWindow, setCallWindow, recipientId }) {

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
  const {data: activeSocket} = useGetSocketQuery(recipientId)
  const [inCall, setInCall] = useState(false)

  console.log("you", activeSocket)
  console.log("me", socket.id)

  useEffect(() => {

    if (callWindow) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    socket.emit("getUserId", { userId: user.id });
    socket.on("me", (socketData) => setMe(socketData.socketId));
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setInCall(true)
      setCall({ isReceivedCall: true, from, name: callerName, signal });


    });
    }
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
  console.log("inCall", inCall)

  const callUser = (id) => {
    console.log(id)
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
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
        socketId={activeSocket}
      />
      <div className={inCall ? "call-notification" : "all-notification-turnoff"}>
      <Notifications
        answerCall={answerCall}
        call={call}
        callAccepted={callAccepted}
      />
      </div>
    </div>
  );
}
