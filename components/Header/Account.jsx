import {Avatar, Button, HStack, Icon, useTheme, VStack,} from "@chakra-ui/react";

import {useRouter} from "next/router";
import {RiSunFill} from "react-icons/ri"
import useSWR from "swr";

export const Account = () => {

  const {icons : {color : {sun}}} = useTheme()

    const {data : {user : session}} = useSWR("/api/getUserSession")

  const router  = useRouter();


    const handelSignOut = async () => {
      const res = await fetch("/api/auth/signout", {
        method: "POST"
      })

      const data = await res.json()
      router.push("/")
    }


    return (
      <HStack spacing={3}>
        <VStack p={2} rounded={50} bg={"#252525"}>
          <Icon as={RiSunFill} color={sun} fontSize={25}/>
        </VStack>
        {
          session ?
              <Button onClick={handelSignOut}>Sign out</Button>
              :
              <Button onClick={() => router.push("/auth")}>Login</Button>
        }
        <Avatar name={session?.email} size={{sm : "sm" , md : "md"}} />
      </HStack>
  );
};
