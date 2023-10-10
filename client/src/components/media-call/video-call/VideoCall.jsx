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
    userProfile,
  } = useContext(CallContext);
  const user = useSelector(selectCurrentUser);
  const [stream, setStream] = useState(null);
  const [audioMute, setAudioMute] = useState(false);
  const [videoMute, setVideoMute] = useState(false);
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.emit("setMyId", { userId: user.id });
    socket.on("calluser", ({ from, name: callerName, avatar, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, avatar, signal });
    });
    socket.on("callended", () => {
      connectionRef.current.destroy();
      window.location.reload();
    })
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
  }, [callWindow]);

  useEffect(() => {
    if (call.isReceivedCall && !callAccepted) {
      setCallWindow(true);
      setCallNotification(true);
    }
  }, [call]);

  useEffect(() => {
    if (callEnded) {
      leaveCall();
    }
  }, [callEnded]);

  const callUser = () => {
    setCallStarted(true);
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
              name: userProfile.displayname,
              avatar: userProfile.avatar,
            });
          });
        }

        peer.on("stream", (stream) => {
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
    setCallAccepted(true);
    setCallNotification(false);
    setCallWindow(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit("dropcall");
    setCallWindow(false);
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  const videoHandler = () => {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    setVideoMute(!videoMute);
  };
  const audioHandler = () => {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    setAudioMute(!audioMute);
  };

  return (
    <>
      {callWindow && (
        <div className={callAccepted ? "call-window__inner" : "call-window__before"}>
          {/* <i className="bi bi-x-circle" onClick={leaveCall} /> */}
            <div className="video-layer">
              <div className="stream">
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
                  callStarted={callStarted}
                  call={call}
                />
              </div>
            </div>
        </div>
      )}

      <div className={ callNotification ? "call-notification" : "call-notification-turnoff"}>
        {<Notifications answerCall={answerCall} rejectCall={leaveCall} call={call} />}
      </div>
    </>
  );
}
