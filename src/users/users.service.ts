import { Injectable } from '@nestjs/common';
import { DbUtils } from 'src/util/db.utils';
import { postUserDto } from './dtos/post-user.dto';
import { logUtil } from 'src/util/logError.utils';
import { updateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbUtils: DbUtils) {}

  async userList() {
    try {
      const usersListed = await this.dbUtils.findUser();

      return usersListed;
    } catch (error) {
      logUtil.logError('user listing', error);
    }
  }

  async userGetAvatar(id: string) {
    try {
      const usersListed = await this.dbUtils.findUserAvatar({ _id: id });

      return usersListed;
    } catch (error) {
      logUtil.logError('user listing', error);
    }
  }

  async userCreate(userData: postUserDto, profilePicture) {
    try {
      const userDataWithProfilePicture = {
        ...userData,
        profilePicture: profilePicture ? profilePicture.buffer : '',
      };

      const userCreated = await this.dbUtils.saveUser(
        userDataWithProfilePicture,
      );

      return userCreated;
    } catch (error) {
      logUtil.logError('user creation', error);
    }
  }

  async userUpdate(id: string, userData: updateUserDto, profilePicture) {
    try {
      const userDataWithProfilePicture = {
        ...userData,
        profilePicture: profilePicture ? profilePicture.buffer : '',
      };

      const userCreated = await this.dbUtils.updateUserById(
        id,
        userDataWithProfilePicture,
      );

      return userCreated;
    } catch (error) {
      logUtil.logError('user creation', error);
    }
  }
}
