import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraire le token de l'en-tête Authorization
            ignoreExpiration: false, // Rejeter les tokens expirés
            secretOrKey: process.env.JWT_SECRET || 'default-secret-key', // Clé secrète pour vérifier le token
        });
    }

    async validate(payload: any) {
        // Cette méthode est appelée si le token est valide
        // Tu peux renvoyer des informations supplémentaires ici (ex. : utilisateur authentifié)
        return { userId: payload.sub, username: payload.username };
    }
}