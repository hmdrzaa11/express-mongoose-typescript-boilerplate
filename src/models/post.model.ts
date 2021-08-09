import { model, Schema, Types, Document, Query } from "mongoose";

interface PostInput {
  title: string;
  content: string;
}

interface PostDoc extends PostInput, Document {}

let postSchema = new Schema<PostDoc>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

postSchema.pre<Query<PostDoc>>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v",
  });

  next();
});

let Post = model<PostDoc>("Post", postSchema);

export default Post;
