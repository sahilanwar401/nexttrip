import mongoose from "mongoose";
 const connectDB = async()=>{
    try {
       await  mongoose.connect(process.env.MONGODB_URL)
       console.log("database connected");
       
        
    } catch (error) {
        console.log("connection failed",error);
        
        
    }
 }
  export default connectDB;