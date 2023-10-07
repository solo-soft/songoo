import {z} from "zod";

export const zodSignup = z
    .object({
        email: z
            .string()
            .min(1, { message: "Email is require" })
            .regex(/(yahoo|gmail|outlook|hotmail)\.com$/i, { message: "fuck" })
            .email({ message: "Invalid email address!" }),

        password: z
            .string()
            .min(4, "Password must be at least 4 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),

        confirmPassword: z
            .string()
            .min(4, "Password must be at least 4 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
