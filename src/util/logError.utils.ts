import { Injectable } from '@nestjs/common';

@Injectable()
export class logUtil {
  static logError(entity: string, error: any): void {
    try {
      console.error(`\n\n Error at ${entity} \n\n`, error);
    } catch (error) {
      console.error('\n\n Error at loging error\n\n', error);
    }
  }
}
