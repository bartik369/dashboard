import express from 'express';
import * as path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import deviceRoutes from './routes/deviceRouter.js';
import todoRoutes from './routes/todoRouter.js';
import authRoutes from './routes/authRouter.js';
import messengerRoutes from './routes/messengerRouter.js'
import errorMiddleware from './middlewares/error-middleware.js'
import checkMediaAccess from './middlewares/checkMediaAccess.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import initSocket from './utils/initSocket.js'

const app = express();
const server = createServer(app)

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(`${__dirname}/../client/dist`));



dotenv.config();
const PORT = process.env.PORT || 5001
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,

}));

const io = new Server(server, {
    cors: 'http://localhost:3000',
    serveClient: false
})
io.on('connection', initSocket)

app.use('/media/messenger/', checkMediaAccess, express.static(path.join(__dirname, 'media/messenger')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', authRoutes, deviceRoutes, todoRoutes, messengerRoutes);
app.use(errorMiddleware);

const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // app.listen(PORT, () => console.log(`The server is running on ${PORT} port`))
        server.listen(PORT, () => {
            console.log(`Server ready on port ${PORT} 🚀`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()