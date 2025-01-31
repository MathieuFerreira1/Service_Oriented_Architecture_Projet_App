import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(JwtAuthGuard) // All routes require a valid JWT
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Retrieve all conversations of a user
  @Get()
  async getUserConversations(@Query('userId') userId: string) {
    return this.messagesService.getUserConversations(userId);
  }

  // Retrieve a specific conversation by conversation ID
  @Get('/:conversationId')
  async getConversationById(@Param('conversationId') conversationId: string) {
    return this.messagesService.getConversationById(conversationId);
  }

  // Send a message
  @Post()
  async sendMessage(
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
    @Body('content') content: string,
  ) {
    return this.messagesService.sendMessage(senderId, receiverId, content);
  }
}