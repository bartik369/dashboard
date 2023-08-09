import { io } from 'socket.io-client';

const SERVER_URI = 'http://localhost:5001'
const socket = io(SERVER_URI)

export default socket