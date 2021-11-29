import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ()=> {
    const URI = process.env.MONGO_URI
    const con = await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // .then(() => {
    //     console.log("Successfully connected to database");
    // })
    // .catch((error) => {
    //     console.log("database connection failed. exiting now...");
    //     console.error(error);
    //     process.exit(1);
    // });


    // console.log(`MongoDB connected to: ${con.connection.host}`);
};


export default connectDB;