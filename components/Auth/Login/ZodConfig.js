import {z} from "zod";

export const zodLogin = z.object({
    email: z
        .string()
        .min(1, { message: "Email is require!" })
        .regex(/(yahoo|gmail|outlook|hotmail)\.com$/i, {
            message: "Invalid email address",
        })
        .email({ message: "Invalid email address!" }),
    password: z.string().min(1, { message: "password is require!" }),
});
