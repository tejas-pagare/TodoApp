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

module.exports={
  createCheck,
  deleteCheck
}

