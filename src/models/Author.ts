import mongoose, { Schema, Document, model } from "mongoose";

export interface IAuthor {
  name: string;
  password: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IAuthorModel>("Author", AuthorSchema);
