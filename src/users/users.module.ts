import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as userModel, UserSchema } from './schemas/user.schema';
import { DbUtils } from 'src/util/db.utils';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: userModel.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, DbUtils],
})
export class UserModule {}
