const zod = require('zod');

/**
 * {
 * title:String,
 * description:String
 * }
 * 
 * {
 * id:String
 * }
 */

const createCheck = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
})

const deleteCheck = zod.object({
  id: zod.string(),
})

const updateCheck = zod.string();

const loginUserCheck = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
})

const signUpUserCheck = zod.object({
  username: zod.string().min(),
  email: zod.string().email(),
  password: zod.string().min(1),
})

module.exports={
  createCheck,
  deleteCheck,
  updateCheck,
  loginUserCheck,
  signUpUserCheck
}

