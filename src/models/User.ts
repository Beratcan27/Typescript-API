import mongoose, { Model, Schema, Document, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  passwordCheck: boolean;
}

export interface IUserMethods {
  CheckPassword: (password: string, rePassword: string) => boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    passwordCheck: { type: Boolean },
  },
  { timestamps: true }
);

UserSchema.method(
  "CheckPassword",
  function CheckPassword(password: string, rePassword: string): boolean {
    if (password === rePassword) {
      return true;
    } else {
      return false;
    }
  }
);

export default mongoose.model<IUser, UserModel>("User", UserSchema);
