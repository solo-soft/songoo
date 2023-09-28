import {
  Avatar,
  Button,
  HStack,
  Icon,
  useTheme,
  VStack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { RiSunFill } from "react-icons/ri";
import useSWR from "swr";

export const User = () => {
  const {data: { user: session },} = useSWR("/api/getUserSession");

  const router = useRouter();

  const handelSignOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });
    await res.json();
    return router.push("/");
  };
  return (
    <HStack
      order={[0, 0, 0 , 3]}
      flex={[0, 0, 0 , 1]}
      justify={["space-between" , "space-between" , "space-between" , "flex-end"]}
      spacing={3}
    >
      {session ? (
        <Button size={["xs", "sm", "sm"]} onClick={handelSignOut}>
          Sign out
        </Button>
      ) : (
        <Button onClick={() => router.push("/auth")}>Login</Button>
      )}
      <Avatar src={"/"} name={session?.email} size={["sm", "md", "md"]} />
    </HStack>
  );
};
