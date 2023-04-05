import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import deviceRoutes from './routes/devices.js';
import todoRoutes from './routes/todos.js';
import authRoutes from './routes/authRouter.js';
import { updateDevice } from './controllers/device-controller.js';
import { updateTodo } from './controllers/todo-controller.js';
import errorMiddleware from './middlewares/error-middleware.js'


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', authRoutes, deviceRoutes, todoRoutes);
app.use(errorMiddleware);


// Get
app.get('/devices', deviceRoutes);
app.get('/todos', todoRoutes);

app.get('/device/:id', deviceRoutes);
app.get('/todo/:id', todoRoutes)

// Post
app.post('/insert', deviceRoutes);
app.post('/newtodo/', todoRoutes)

//Delete
app.delete('/device/:id', deviceRoutes)
app.delete('/todo/:id', todoRoutes)

//Update
app.put('/device/:id', updateDevice);
app.put('/todo/:id', updateTodo)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`The server is running on ${PORT} port`))
    } catch (error) {
        console.log(error)
    }
}
start()