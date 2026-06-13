import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
export const AccountModel = mongoose.model("Account", AccountSchema);
console.log("ENV:", process.env.MONGODB_URL);
export async function connectToMongoDB() {
  try {
    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) {
      throw new Error("MONGODB_URI is undefined");
    }

    await mongoose.connect(dbUrl);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
