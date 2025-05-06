const { z } = require("zod");
const signupSchema = z.object({
    username: z
    .string({ required_error: "Name is Required"})
    .trim()
    .min(3,{ message: "Name must be at least 03 characters"})
    .max(255,{message: "Name must not be more then 255 characters"}),

    email: z
    .string({ required_error: "Email is Required"})
    .trim()
    .min(3,{ message: "Email must be at least 03 characters "})
    .max(255,{ message: "Email must not be more then 255 characters"}),

    password: z
    .string({ required_error: "Password is Required"})
    .trim()
    .min(7,{ message: "Password must be at least 07 characters "})
    .max(11,{ message: "Password must not be more then 11 characters"}),

    phone: z
    .string({ required_error: "Phone Number is Required"})
    .trim()
    .min(11,{ message: "Phone Number must be at least 11 digits "})
    .max(14,{ message: "Phone Number must not be more then 14 digits"}),


});

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is Required"})
    .trim()
    .min(3,{ message: "Email must be at least 03 characters "})
    .max(255,{ message: "Email must not be more then 255 characters"}),

    password: z
    .string({ required_error: "Password is Required"})
    .trim()
    .min(7,{ message: "Password must be at least 07 characters "})
    .max(11,{ message: "Password must not be more then 11 characters"}),
});

module.exports = {signupSchema, loginSchema};