import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateUserDto } from './dtos/update-user.dto';
import { postUserDto } from './dtos/post-user.dto';
import { UserService } from './users.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async userList(@Res() response): Promise<any> {
    const userListed = await this.userService.userList();

    if (userListed) return response.status(HttpStatus.OK).send(userListed);
    return response.status(HttpStatus.NOT_FOUND).send('Any user found');
  }

  @UseGuards(AuthGuard)
  @Get('/:id/avatar')
  async userGetAvatar(
    @Param() userGetAvatarParam,
    @Res() response,
  ): Promise<any> {
    const { id } = userGetAvatarParam;

    const userListed = await this.userService.userGetAvatar(id);

    if (userListed) return response.status(HttpStatus.OK).send(userListed);
    return response.status(HttpStatus.NOT_FOUND).send('Any user avatar found');
  }

  @UseGuards(AuthGuard)
  @Post('')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async userCreate(
    @UploadedFile() profilePicture,
    @Body() postUserDtoBody: postUserDto,
    @Res() response,
  ): Promise<any> {
    const userCreated = await this.userService.userCreate(
      postUserDtoBody,
      profilePicture,
    );

    if (userCreated) {
      return response.status(HttpStatus.CREATED).send(userCreated);
    }
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send('Error while creating the user');
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async userUpdate(
    @UploadedFile() profilePicture,
    @Body() userUpdateBody: updateUserDto,
    @Param() userUpdateParam,
    @Res() response,
  ): Promise<any> {
    const { id } = userUpdateParam;

    const userUpdated = await this.userService.userUpdate(
      id,
      userUpdateBody,
      profilePicture,
    );

    if (userUpdated) return response.status(HttpStatus.OK).send(userUpdated);
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send('Error while updating the user');
  }
}
