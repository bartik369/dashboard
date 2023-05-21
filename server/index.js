import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import deviceRoutes from './routes/deviceRouter.js';
import todoRoutes from './routes/todoRouter.js';
import authRoutes from './routes/authRouter.js';
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

const start = async() => {
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