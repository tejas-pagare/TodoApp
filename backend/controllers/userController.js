const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET } = require('../utils/constant');
const { signUpUserCheck, loginUserCheck } = require('../types');

const createToken = (id)=>{
  const token =  jwt.sign({id},SECRET);
  return token;
}

module.exports.getUserDetails = async(req,res)=>{
  const user = jwt.decode(req.headers.token);
  try {
    const matchUser = await User.findByIdAndUpdate({_id:user.id});
    return res.status(200).json({
      success:true,
      msg:"User Found",
      data:matchUser
    })
    
  } catch (error) {
    return res.status(400).json({
      success:false,
      msg:"No such user exists"
    })
  }
}

module.exports.userSignUpController = async(req,res)=>{
  const {username,email,password} = req.body;
  const dataCheck = signUpUserCheck.safeParse({
    username,email,password
  })
  if(!dataCheck.success){
    return res.status(400).json({message:dataCheck.error.issues})
  }

  try {
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message:"Email already exists"})
    }
    
  } catch (error) {
    return res.status(400).json({
      success:false,
      msg:error.message
    })
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password:hashedPassword
  })
  try {
    const newUser = await user.save();

   const token = createToken(newUser._id);

  return  res.status(200).json({
     success:true,
     msg:"User created successfully",
     newUser,
     token
   });
   
  } catch (error) {
    return res.status(400).json({
      success:false,
      msg:error.message
    })
  }
}


module.exports.userLoginController = async(req,res)=>{
  const {email,password} = req.body;
  const dataCheck = loginUserCheck.safeParse({
    email,password
  })
  if(!dataCheck.success){
    return res.status(400).json({message:dataCheck.error.issues})
  }
  try {
    const  user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        msg:"Invalid email or password"
      })
    }

    const passwordCheck = await bcrypt.compare(password,user.password);
    if(!passwordCheck){
      return res.status(400).json({
        success:false,
         msg:"Invalid email or password"
      })
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      msg:"user Login Sucessfully",
      token
    })

  } catch (error) {
    return res.status(400).json({
      success:false,
      msg:error.message,
      
    })
    
  }

}

