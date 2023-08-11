import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useSetSocketMutation } from "../../store/features/messenger/messengerApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/features/auth/authSlice";

const SocketContext = createContext()

const ContextProvider = ({ children }) => {

        const user = useSelector(selectCurrentUser)

        const [stream, setStream] = useState(null);
        const [me, setMe] = useState('');
        const [call, setCall] = useState({});
        const [callAccepted, setCallAccepted] = useState(false);
        const [callEnded, setCallEnded] = useState(false);
        const [name, setName] = useState('');
        const myVideo = useRef()
        const userVideo = useRef()
        const connectionRef = useRef()
        const socket = io.connect('http://localhost:5001/');

        // const [setSocket] = useSetSocketMutation()

        useEffect(() => {
            socket.on('connect', function() {
                socket.emit('getUserId', {userId: user.id})
            })
        }, [user])

        useEffect(() => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                    setStream(currentStream)
                    myVideo.current.srcObject = currentStream;
            })
            socket.on('me', (socketData) => setMe(socketData.socketId))
            socket.on('calluser', ({ from, name: callerName, signal }) => {
                setCall({ isReceivedCall: true, from, name: callerName, signal })
            })
        }, [])

        const answerCall = () => {
            setCallAccepted(true);
            const peer = new Peer({ initiator: false, trickle: false, stream })

            peer.on('signal', (data) => {
                socket.emit('answercall', { signal: data, to: call.from })
            });
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream
            });
            peer.signal(call.signal)
            connectionRef.current = peer

        }
        const callUser = (id) => {
            const peer = new Peer({ initiator: true, trickle: false, stream })
            peer.on('signal', (data) => {
                socket.emit('calluser', { userToCall: id, signalData: data, from: me, name })
            });
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream
            });
            socket.on('callaccepted', (signal) => {
                setCallAccepted(true)
                peer.signal(signal)
            })
            connectionRef.current = peer
        }
        const leaveCall = () => {
            setCallEnded(true);
            connectionRef.current.destroy();
            window.location.reload()
        }
        return ( <SocketContext.Provider value = {
                {
                    call,
                    callAccepted,
                    myVideo,
                    userVideo,
                    stream,
                    name,
                    setName,
                    callEnded,
                    me,
                    callUser,
                    leaveCall,
                    answerCall,
                }
            } > { children } </SocketContext.Provider>)
        }
        export { ContextProvider, SocketContext }