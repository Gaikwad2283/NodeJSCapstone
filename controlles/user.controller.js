const userModel = require("../models/User_Schema");

module.exports.registerUser=async(req,res,next)=>{
    const {username,email,password,admin}=req.body;
    console.log(username);
    const hashedPassword=await userModel.hashPassword(password);
    const newuser= new userModel({
        "username":username,
        "password":hashedPassword,
        "email":email,
        "admin":admin
    });

    await newuser.save();
    res.status(200).json("User Registered Successfully")
}

module.exports.loginUser=async(req,res,next)=>{
    const {username,password}=req.body;

    const isUser=await userModel.findOne({"username":username});
    if(!isUser){
        res.status(401).json("Enter valid data");
    }
    const isAuthenticated=await isUser.comparePassword(password);

    if(!isAuthenticated){
        return res.status(401).json({message:'Invalid Email or Password'});
    }
    res.status(200).json("User Login Successfully")
}

module.exports.getUsers=async(req,res,next)=>{
    const getUsers= await userModel.find({});
    res.status(201).json({getUsers});
}