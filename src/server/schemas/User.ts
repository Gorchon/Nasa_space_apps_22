import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  username: string;
  password: string;
}

export type UserDocument = IUser & Document;
export type UserModel = Model<UserDocument>;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
});

export default (mongoose.models.User ||
  model<IUser>('User', UserSchema)) as UserModel;
