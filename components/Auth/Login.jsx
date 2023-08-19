import {motion} from "framer-motion";
import {Box, Button, HStack, Input, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import notification from "../../lib/notification";
import {useRouter} from "next/router";


const Login = ({login}) => {

    const word = "Songoo"

    const [error, setError] = useState(false)
    const [status, setStatus] = useState(false)

    const router = useRouter()


    const zodSignup = z.object({
        email: z.string()
            .min(1, {message: "Email is require!"})
            .regex(/(yahoo|gmail|outlook|hotmail)\.com$/i, {message: "Invalid email address"})
            .email({message: "Invalid email address!"}),
        password: z.string().min(1, {message: "password is require!"})
    })


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(zodSignup),
    })


    const handelLogin = async (data) => {

        const loginToast = toast.loading("Please wait...")

        const res = await fetch("api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })


        const status = await res.status
        const info = await res.json()

        console.log(info)

        if (status === 200) {

            notification(loginToast, info.message, "success")
            return router.push("/")
        }
        if (status === 400) return notification(loginToast, info.message, "error")


    }


    return (
        <motion.div
            style={{flex: 1, display: login ? "block" : "none"}}
            initial={{opacity: 0}}
            animate={{
                opacity: login ? ["0%", "20%", "50%", "100%"] : 0,
                scale: login ? ["0%", "20%", "40%", "60%", "80%", "100%"] : 0,
                x: login ? "100%" : "0%"
            }}
            transition={{
                duration: .5,
                delay: login ? 0 : .3
            }}>

            <VStack h={"100vh"} flex={1} justifyContent={"center"}>

                <VStack spacing={0}>

                    <HStack align={"center"} color={"cyan.500"} spacing={0}>


                        {Array.from(word).map((letter, index) => (
                            <motion.div
                                key={index}
                                animate={{
                                    y: index === 4 || index === 5 ? 10 : 0
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                }}
                            >
                                <Text fontSize={"6xl"} fontWeight={"extrabold"}>
                                    {letter}
                                </Text>
                            </motion.div>
                        ))}

                    </HStack>


                    <Text>A wonderful music streaming app </Text>
                </VStack>

                <VStack w={450}>

                    <HStack width={"full"} justify={"space-between"}>

                        <HStack>
                            <Box rounded={5} bg={"whiteAlpha.200"} px={4} py={2}>G</Box>
                            <Box rounded={5} bg={"whiteAlpha.200"} px={4} py={2}>S</Box>
                        </HStack>


                        <motion.div whileHover="hover" whileTap="hover" variants={{
                            hover: {
                                scale: 1.1,
                                rotate: [0, -5, 5, -5, 5, 0], // Adds a shake effect
                                transition: {
                                    duration: 0.3,
                                    repeat: 1, // Number of times the shake animation will repeat
                                    repeatType: 'reverse', // Reverses the animation on each repeat
                                    ease: [0.90, 0.05, 0.90, 0.95],
                                },
                            }
                        }}>
                            <Button
                                isLoading={status}
                                onClick={handleSubmit(handelLogin)}
                                bgGradient='linear(to-l, #7928CA, #FF0080)'
                                variant='solid'>Login</Button>
                        </motion.div>


                    </HStack>


                    <Input {...register("email", {required: true})}
                           border={"none"}
                           _hover={{bg: "whiteAlpha.200"}}
                           _focus={{bg: "whiteAlpha.200"}}
                           _placeholder={{fontSize: "xs"}}
                           size={"sm"}
                           fontSize={"xs"}
                           bg={error ? "rgba(179,0,0,0.28)" : "whiteAlpha.200"}
                           variant='filled' placeholder='Email'/>


                    <Input
                        {...register("password", {required: true})}
                        border={"none"}
                        _hover={{bg: "whiteAlpha.200"}}
                        _focus={{bg: "whiteAlpha.200"}}
                        _placeholder={{fontSize: "xs"}}
                        size={"sm"}
                        fontSize={"xs"}
                        bg={error ? "rgba(179,0,0,0.28)" : "whiteAlpha.200"}
                        variant='filled' placeholder='Password'/>


                    <Box w={"full"} h={55}>
                        <HStack>
                            {errors?.email?.message && <Box p={1} rounded={50} bg={"red.500"}/>}
                            <Text color={"red.500"} fontSize={"xs"}>{errors?.email?.message}</Text>
                        </HStack>
                        <HStack>
                            {errors?.password?.message && <Box p={1} rounded={50} bg={"red.500"}/>}
                            <Text color={"red.500"} fontSize={"xs"}>{errors?.password?.message}</Text>
                        </HStack>
                    </Box>


                </VStack>

            </VStack>
        </motion.div>
    );
};

export default Login;