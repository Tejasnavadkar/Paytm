const {z} = require("zod")

const SignupSchema = z.object({
    username: z.string().email().min(3,{message:'Field is required'}).max(30).trim().required(),
	firstName: z.string().required().max(50).trim(),
	lastName: z.string().required().trim().max(50),
	password: z.string().required().min(6)
})

const SigninSchema = z.object({
    username:z.string().email().required().min(3,{message:'Field is required'}).max(30).trim(),
    password:z.string().required().min(6)
})

const updateBody = z.object({
    password: z.string().optional(),
	firstName:z.string().optional() ,
	lastName: z.string().optional()
})

module.exports = {
    SignupSchema,
    SigninSchema,
    updateBody
}