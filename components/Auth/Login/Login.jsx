import { motion } from "framer-motion";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import notification from "../../../lib/notification";
import { useRouter } from "next/router";
import Email from "../Common/Email";
import Password from "../Common/Password";
import Errors from "../Common/Errors";
import ActionButton from "../Common/ActionButton";
import Name from "../Common/Name";
import { zodLogin } from "./ZodConfig";
import RouteButton from "../Common/RouteButton";

const Login = ({ login }) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);

  const router = useRouter();

  console.log(login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodLogin),
  });

  const handelLogin = async (data) => {
    const loginToast = toast.loading("Please wait...");

    const res = await fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const status = await res.status;
    const info = await res.json();

    if (status === 200) {
      notification(loginToast, info.message, "success");
      return router.push("/");
    }
    if (status === 400) return notification(loginToast, info.message, "error");
  };

  return (
    <VStack maxW={"md"} m={"auto"} h={"100vh"} zIndex={9999} position={"relative"} justifyContent={"center"}>
      <Name />

      <HStack w={"full"}>
        <ActionButton
            title={"Login"}
            handleSubmit={handleSubmit(handelLogin)}
            status={status}
        />
        <RouteButton title={"Signup"}/>
      </HStack>

      <Email register={register} />
      <Password register={register} />
      <Errors errors={errors} />
    </VStack>
  );
};

export default Login;
