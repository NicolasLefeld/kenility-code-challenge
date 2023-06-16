import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'kenility-codechallenge',
    }),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
