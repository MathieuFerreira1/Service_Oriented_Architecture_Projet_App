export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    city?: string; // Optionnel lors de l'inscription
    bio?: string; // Optionnel lors de l'inscription
}