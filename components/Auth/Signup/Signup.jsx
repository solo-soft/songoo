import { motion } from "framer-motion";
import { HStack, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Email from "../Common/Email";
import Password from "../Common/Password";
import ConfirmPassword from "./ConfirmPassword";
import Errors from "../Common/Errors";
import ActionButton from "../Common/ActionButton";
import Name from "../Common/Name";
import { zodSignup } from "./ZodConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import notification from "../../../lib/notification";
import RouteButton from "../Common/RouteButton";

const Signup = ({ login }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSignup),
  });

  const [status, setStatus] = useState(false);

  const setUserInfo = async (data) => {
    const signupToast = toast.loading("Please wait...");
    setStatus(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const info = await res.json();
      const status = await res.status;

      setStatus(false);
      if (status === 200)
        return notification(signupToast, info.message, "success");
      if (status === 400)
        return notification(signupToast, info.message, "error");
    } catch (e) {
      notification(signupToast, e, "error");
      console.log(e);
    }
  };

  return (
    <VStack
      maxW={"md"}
      m={"auto"}
      h={"100vh"}
      zIndex={9999}
      position={"relative"}
      justifyContent={"center"}
    >
      <Name />

      <HStack w={"full"}>
        <ActionButton
          title={"Lets go"}
          handleSubmit={handleSubmit(setUserInfo)}
          status={status}
        />
        <RouteButton title={"Login"} />
      </HStack>
      <Email register={register} />
      <Password register={register} />
      <ConfirmPassword register={register} />
      <Errors errors={errors} />
    </VStack>
  );
};

export default Signup;
