import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    searchByCity(city: string): Promise<import("./schemas/user.schema").User[]>;
    findByCEmail(email: string): Promise<import("./schemas/user.schema").User>;
    getProfile(username: string): Promise<import("./schemas/user.schema").User>;
    updateProfile(username: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").User>;
}
