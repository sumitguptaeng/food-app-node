import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
   try {
    await mongoose.connect(process.env.MONGO_URL,{
    });
    console.log(`Connected to Database: ${mongoose.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`Database connection error: ${error.message}`.bgRed);
    process.exit(1);
  }
};


export default connectDb;