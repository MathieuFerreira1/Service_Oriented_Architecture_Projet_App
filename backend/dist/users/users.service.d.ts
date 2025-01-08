import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User>;
    searchByCity(city: string): Promise<User[]>;
}
