import mongoose from 'mongoose';
import { UserModel } from '../../modules/security/models/user.model';
import { RoleModel } from '../../modules/security/models/role.model';
import { UserRoleModel } from '../../modules/security/models/user-role.model';
import { WorkflowModel } from '../../modules/workflows/models/workflow.model';


export async function initializeDatabase(): Promise<void> {
    await mongoose.connection.db!.command({
        ping: 1
    });

    await UserModel.createCollection();
    await RoleModel.createCollection();
    await UserRoleModel.createCollection();
    await WorkflowModel.createCollection();

    console.log('Database collections initialized.');
}