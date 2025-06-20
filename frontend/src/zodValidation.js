import {z} from 'zod'

 export const SignupSchema = z.object({
    username: z.string().email(),
    firstname: z.string().min(2,{message:'name have atleast 2 character'}),
    lastname: z.string(),
    password: z.string().min(6,{meassge:'password must be 6 characters'})
})

export const SigninSchema = z.object({
    username:z.string().email().min(3,{message:'Field is required'}).max(30).trim(),
})



