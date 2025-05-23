import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { checkConnection } from './config/db';
import userRoutes from './routes/user.routes';
import studentInfoRoutes from './routes/studentInfo.routes';
import agentRoutes from './routes/agent.routes';
import phaseOneRoutes from './routes/phase_1.routes';
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors( {origin: 'http://24.199.103.0', credentials: true }));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/student-info', studentInfoRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/phase-one', phaseOneRoutes);

checkConnection().then(() => {
app.listen(PORT, () => { 
    console.log(`Servidor Corriendo ${PORT}`);
    });
});