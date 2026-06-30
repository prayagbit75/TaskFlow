import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async ()=>{
    try{
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`mongodb connected : ${connectionInstant.connection.host}`);
    }catch(error){
        console.log("Mongodb connection fail : ",error);
        process.exit(1);
    }
}

export default connectDB;
    