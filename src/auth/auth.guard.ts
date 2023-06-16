import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Credenciales no proporcionadas');
    }
    const [schema, credentials] = authorizationHeader.split(' ');

    const decodedCredentials = Buffer.from(credentials, 'base64').toString(
      'utf-8',
    );
    const [username, password] = decodedCredentials.split(':');

    if (username === process.env.USERNAME && password === process.env.PASSWORD)
      return true;

    return false;
  }
}
