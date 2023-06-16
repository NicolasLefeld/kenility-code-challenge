import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  profilePicture: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);
