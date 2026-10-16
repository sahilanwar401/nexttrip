import express from "express"
import dotenv from "dotenv"
dotenv.config()
 import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)
app.use("/api/booking",bookingRouter)


  

app.listen(process.env.PORT,(err)=>{
   connectDB()
   
     if(err){
        console.log("something went wrong");
        
     }
     console.log("server started");
     

})