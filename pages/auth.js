import {Box, Button, HStack, Input, Stack, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useAnimate} from "framer-motion";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import notification from "../lib/notification";
import {toast} from "react-toastify";
import Login from "../components/Auth/Login";
import {NextRequest} from "next/server";
import {verify} from "jsonwebtoken";



const Auth = ({userInfo}) => {

    const [error, setError] = useState(false)
    const [login, setLogin] = useState(false)
    const [status, setStatus] = useState(false)

    console.log(userInfo)

    const zodSignup = z.object({
        email: z.string()
            .min(1, {message: "Email is require"})
            .regex(/(yahoo|gmail|outlook|hotmail)\.com$/i, {message: "fuck"})
            .email({message: "Invalid email address!"}),

        password: z.string().min(4, 'Password must be at least 4 characters long')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),

        confirmPassword: z.string().min(4, 'Password must be at least 4 characters long')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    })


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(zodSignup),
    })


    const word = "Songoo"


    const setUserInfo = async (data) => {

        const signupToast = toast.loading("Please wait...")
        setStatus(true)

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const info = await res.json()
            const status = await res.status

            setStatus(false)
            if (status === 200) return notification(signupToast, info.message, "success")
            if (status === 400) return notification(signupToast, info.message, "error")


        } catch (e) {
            notification(signupToast, e, "error")
            console.log(e)
        }

    }


    return (


        <HStack width={"100%"} height={"100vh"} spacing={0}>

            <Button onClick={() => setLogin(prevState => !prevState)} position={"absolute"} zIndex={100}>CLick</Button>

            <motion.div
                style={{flex: 1, display: !login ? "block" : "none"}}
                initial={{opacity: login ? 1 : 0}}
                animate={{opacity: login ? 0 : 1}}
                transition={{
                    duration: .5,
                    delay: login ? 0 : .3
                }}>

                <VStack h={"100vh"} flex={1} justifyContent={"center"}>
                    <VStack spacing={0}>
                        <HStack color={"cyan.500"} spacing={0}>

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
                                    onClick={handleSubmit(setUserInfo)}
                                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    variant='solid'>Lets go</Button>
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
                               variant='filled' placeholder='What is your Email ?'/>


                        <Input {...register("password", {required: true})}
                               border={"none"}
                               _hover={{bg: "whiteAlpha.200"}}
                               _focus={{bg: "whiteAlpha.200"}}
                               _placeholder={{fontSize: "xs"}}
                               size={"sm"}
                               fontSize={"xs"}
                               bg={error ? "rgba(179,0,0,0.28)" : "whiteAlpha.200"}
                               variant='filled' placeholder='Choose a strong Password'/>
                        <Input {...register("confirmPassword", {required: true})}
                               border={"none"}
                               _hover={{bg: "whiteAlpha.200"}}
                               _focus={{bg: "whiteAlpha.200"}}
                               _placeholder={{fontSize: "xs"}}
                               size={"sm"}
                               fontSize={"xs"}
                               bg={error ? "rgba(179,0,0,0.28)" : "whiteAlpha.200"}
                               variant='filled' placeholder='Repeat your Password'/>


                        <Box w={"full"} h={55}>
                            <HStack>
                                {errors?.email?.message && <Box p={1} rounded={50} bg={"red.500"}/>}
                                <Text color={"red.500"} fontSize={"xs"}>{errors?.email?.message}</Text>
                            </HStack>
                            <HStack>
                                {errors?.password?.message && <Box p={1} rounded={50} bg={"red.500"}/>}
                                <Text color={"red.500"} fontSize={"xs"}>{errors?.password?.message}</Text>
                            </HStack>
                            <HStack>
                                {errors?.confirmPassword?.message && <Box p={1} rounded={50} bg={"red.500"}/>}
                                <Text color={"red.500"} fontSize={"xs"}>{errors?.confirmPassword?.message}</Text>
                            </HStack>
                        </Box>


                    </VStack>

                </VStack>
            </motion.div>





            <Login login={login}/>

            <motion.div
                initial={{x: login ? "-100%" : "100%"}}
                animate={{x: login ? "-100%" : "0%"}}
                transition={{duration: .5}}
                style={{flex: 1}}>

                <Box position={"relative"} h={"100vh"} flex={1} overflow={"hidden"}
                     roundedTopRight={login ? 45 : 0}
                     roundedBottomRight={login ? 45 : 0}
                     roundedTopLeft={!login ? 45 : 0}
                     roundedBottomLeft={!login ? 45 : 0}>

                    <Box zIndex={1} position={"absolute"} w={"100%"} h={"100vh"} bg={"blackAlpha.300"}/>

                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .5}} key={login}>
                        <video style={{width: "100%", height: "100vh", position: "absolute", objectFit: "cover"}}
                               src={login ? "/dance2.mp4" : "/dance1.mp4"} loop muted autoPlay/>
                    </motion.div>

                </Box>

            </motion.div>


            <Text position={"absolute"} bottom={3} left={3} fontSize={"xs"}>Power by solo-soft v2.0</Text>
        </HStack>
    )
        ;
};

export default Auth;


