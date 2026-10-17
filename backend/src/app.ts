import express from 'express';
import cors from 'cors';
import allRoutes from './routes';



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get(
    '/',
    (req, res) => {

        res.json({
            success: true,
            message: 'FlowCraft API is running.'
        });
    }
);

app.use(allRoutes);

export default app;

// import express from 'express';

// const app = express();

// const PORT = 3000;

// app.get('/api/workflows', (_req, res) => {
//   console.log('workflows{}')
//   res.json({
//     status: 'ok',
//     message: 'FlowCraft backend is running',
//     data: [],
//   });
// });

// app.get('/api/health', (_req, res) => {
//   res.json({
//     status: 'ok',
//     message: 'FlowCraft backend is running',
//   });
// });

// app.listen(PORT, () => {
//   console.log('=================================');
//   console.log(' FlowCraft Backend');
//   console.log('=================================');
//   console.log(` Server running on port ${PORT}`);
//   console.log(` http://localhost:${PORT}`);
//   console.log('=================================');
// });


