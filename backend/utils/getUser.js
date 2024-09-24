const User = require('../models/userSchema');


const getUser = async(id)=>{
  const matchUser = await User.findById({_id:id});
  return matchUser;
}

module.exports = getUser;