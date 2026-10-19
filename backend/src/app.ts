import express from 'express';
import cors from 'cors';
import allRoutes from './routes';



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use(allRoutes);

export default app;






