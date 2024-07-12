import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://admin:password@127.0.0.1:27017/CGS?authSource=admin`
    );
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
