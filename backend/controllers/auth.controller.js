import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let exitUser = await User.findOne({ email });
    if (exitUser) {
      return res
        .status(400)
        .json({ message: "User already exits with this email address    " });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    
    

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      // secure: (process.env.NODE_ENVIRONMENT = "production"),
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "register successfully", user });
  } catch (error) {
    res.status(500).json({
        message:`register error In error ${error}`
    })
  }
};

export const login = async (req,res) => {
  try {
    
    let { email, password } = req.body;
    let user = await User.findOne({ email }).populate("listing","title image1 image2 image3  description rent category city landmark");
    if (!user) {
      return res
        .status(400)
        .json({ message: " user not exits " });
    }
     let isMatchPassword = await bcrypt.compare(password,user.password)
      if(!isMatchPassword){
        return res.status(400).json({
          message:"Incorrect password"
        })
      }
   

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: (process.env.NODE_ENVIRONMENT = "production"),
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "logged IN successfully", user });


  } catch (error) {
     res.status(500).json({
        message:`logged In error ${error}`
    })

  }
};

 export const logOut = async(req,res)=>{
  try {
    res.clearCookie("token")
    res.status(200).json({message:"log Out successfully"})
    
  } catch (error) {
    res.status(500).json({message:"logout error"})
    
  }
 }
