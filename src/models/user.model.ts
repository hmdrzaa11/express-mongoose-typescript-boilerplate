import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserDoc extends UserInput, Document {
  comparePassword: (candidate: string) => Promise<boolean>;
  isPasswordChanged: (tokenInitial: number) => boolean;
  passwordChangedAt: Date;
}

let userSchema = new Schema<UserDoc>(
  {
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
    passwordChangedAt: Date,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (this: UserDoc, next) {
  if (!this.isModified("password")) return next();
  let hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isPasswordChanged = function (this: UserDoc, tokenIat) {
  if (!this.passwordChangedAt) return false;

  return this.passwordChangedAt.getTime() / 1000 > tokenIat;
};

let User = model<UserDoc>("User", userSchema);
export default User;
