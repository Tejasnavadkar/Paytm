const zod = require("zod")

const SignupSchema = zod.object({
    // username: z.string().email().min(3,{message:'Field is required'}).max(30).trim(),
	// firstName: z.string().max(50).trim(),
	// lastName: z.string().trim().max(50),
	// password: z.string().min(6)

    username: zod.string().email(),
	firstname: zod.string(),
	lastname: zod.string(),
	password: zod.string()
})

const SigninSchema = zod.object({
    username:zod.string().email().min(3,{message:'Field is required'}).max(30).trim(),
    password:zod.string().min(6)
})

const updateBody = zod.object({
    password: zod.string().optional(),
	firstname:zod.string().optional(),
	lastname: zod.string().optional()
})

module.exports = {
    SignupSchema,
    SigninSchema,
    updateBody
}