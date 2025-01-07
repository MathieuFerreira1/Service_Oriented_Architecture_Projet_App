import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(user: Partial<User>): Promise<User>;
    findOne(username: string): Promise<User | null>;
}
