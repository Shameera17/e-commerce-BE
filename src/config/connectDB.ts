import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI: any = process.env.DB_URI;
    // Mongoose will ensure that only the fields that are specified in your schema will
    // be saved in the database,
    mongoose.set("strictQuery", true);
    const result = await mongoose.connect(URI);
    console.log(`Database connection successfully: ${result.connection.host}`);
  } catch (error: any) {
    console.log(`Database connection failed: ${error.message}`);
    // exit with failure
    process.exit(1);
  }
};
export default connectDB;
