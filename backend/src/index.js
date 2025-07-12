import express from 'express';
import AuthRoutes from '../src/routes/auth.route.js';
import MessageRoutes from '../src/routes/message.route.js';
import dotenv from 'dotenv';
import {connctDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json({limit: '5mb'}));
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true, // Allow cookies to be sent with requests
    }
));


app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);




app.listen(port, () => { 
    console.log(`server is running on port ${port}`)
    connctDB();
})

