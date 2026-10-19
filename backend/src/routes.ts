
import { Router } from 'express';

import userRoutes from './modules/security/routes/user.routes';
import roleRoutes from './modules/security/routes/role.routes';
import userRoleRoutes from './modules/security/routes/user-role.routes';
import workflowRoutes from './modules/workflows/routes/workflow.route';

const allRoutes = Router();

allRoutes.get(
    '/',
    (req, res) => {

        res.json({
            success: true,
            message: '✅ FlowCraft API is running.'
        });
    }
);

allRoutes.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: '⚡ FlowCraft backend is running ⚡',
    });
});



const apiPrefix = process.env['API_PREFIX'] || '/api';

// Security routes
allRoutes.use(`${apiPrefix}/users`, userRoutes);
allRoutes.use(`${apiPrefix}/roles`, roleRoutes);
allRoutes.use(`${apiPrefix}/user-roles`, userRoleRoutes);

// Workflow routes
allRoutes.use(`${apiPrefix}/workflow`, workflowRoutes);


export default allRoutes;
