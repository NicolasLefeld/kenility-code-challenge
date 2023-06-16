import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User as userModel } from '../users/schemas/user.schema';
import { User as userInterface } from '../users/interfaces/user.interface';
import { logUtil } from './logError.utils';

@Injectable()
export class DbUtils {
  constructor(
    @InjectModel(userModel.name) private userModel: Model<userModel>,
  ) {}

  async findUser(filterParams = {}, projection = ''): Promise<any> {
    try {
      const users = await this.userModel.find(filterParams, projection);

      if (users.length > 0) return users;
      return false;
    } catch (error) {
      logUtil.logError('findUser', error);
    }
  }

  async findUserAvatar(filterParams = {}, projection = ''): Promise<any> {
    try {
      const user = await this.userModel.find(filterParams, projection);

      if (user.length > 0) {
        const profilePicture = user[0].profilePicture;

        return profilePicture;
      }

      return false;
    } catch (error) {
      logUtil.logError('findUser', error);
    }
  }

  async saveUser(userData: userInterface): Promise<any> {
    try {
      const userCreated = new this.userModel(userData);
      const userSaved = await userCreated.save();

      if (userSaved) {
        const userParsed = {
          id: userSaved._id,
          name: userSaved.name,
          lastName: userSaved.lastName,
          address: userSaved.address,
          profilePicture: userSaved.profilePicture,
        };

        return userParsed;
      }
      return false;
    } catch (error) {
      logUtil.logError('saveUser', error);
    }
  }

  async updateUserById(id, updateParams): Promise<any> {
    try {
      const userUpdated = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateParams,
      );

      if (userUpdated) {
        const userParsed = {
          id: userUpdated._id,
          name: userUpdated.name,
          lastName: userUpdated.lastName,
          address: userUpdated.address,
          profilePicture: userUpdated.profilePicture,
        };

        return userParsed;
      }

      return false;
    } catch (error) {
      logUtil.logError('updateUserById', error);
    }
  }
}
