const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const userVerfier = async(req,res,next)=>{
  
  const user = jwt.decode(req.headers.token);
  if(!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const matchUser = await User.findById({_id:user.id});
    // console.log(matchUser)
    if(!matchUser) {
      res.status(401).json({ message: 'Unauthorized And no Such user Exists' });
    }
    next();
    
  } catch (error) {
    return res.status(401).json({ message: 'Internal Server Error' });
  }

}

module.exports = userVerfier;