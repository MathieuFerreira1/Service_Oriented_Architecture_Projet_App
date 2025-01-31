import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mathieu:mathieupassword@cluster0.bmdk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        dbName: 'projet',
      },
    ),
    AuthModule,
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}
