import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // Méthode pour créer un nouvel utilisateur
    async create(user: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    // Méthode pour trouver un utilisateur par son nom d'utilisateur
    async findOne(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }
}