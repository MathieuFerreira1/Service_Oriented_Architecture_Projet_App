import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(JwtAuthGuard) // Toutes les routes nécessitent un JWT valide
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    // Récupérer toutes les conversations d’un utilisateur
    @Get()
    async getUserConversations(@Query('userId') userId: string) {
        return this.messagesService.getUserConversations(userId);
    }

    // Récupérer une conversation spécifique
    @Get(':receiverId')
    async getConversation(@Query('senderId') senderId: string, @Param('receiverId') receiverId: string) {
        return this.messagesService.getConversation(senderId, receiverId);
    }

    // Envoyer un message
    @Post()
    async sendMessage(
        @Body('senderId') senderId: string,
        @Body('receiverId') receiverId: string,
        @Body('content') content: string,
    ) {
        return this.messagesService.sendMessage(senderId, receiverId, content);
    }
}