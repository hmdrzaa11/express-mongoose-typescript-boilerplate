import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserDoc extends UserInput, Document {
  comparePassword: (candidate: string) => Promise<boolean>;
}

let userSchema = new Schema<UserDoc>({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.pre("save", async function (this: UserDoc, next) {
  if (!this.isModified("password")) return next();
  let hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

let User = model<UserDoc>("User", userSchema);
export default User;
