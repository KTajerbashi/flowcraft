import express from 'express';
import cors from 'cors';

import userRoutes from './modules/security/routes/user.routes';
import roleRoutes from './modules/security/routes/role.routes';
import userRoleRoutes from './modules/security/routes/user-role.routes';



const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const apiPrefix = process.env['API_PREFIX'] || '/api';

app.get(
    '/',
    (req, res) => {

        res.json({
            success: true,
            message: 'FlowCraft API is running.'
        });
    }
);

app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/roles`, roleRoutes);
app.use(`${apiPrefix}/user-roles`, userRoleRoutes);

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


