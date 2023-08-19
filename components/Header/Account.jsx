import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Button, Text, HStack, Box, Icon, useTheme, VStack,
} from "@chakra-ui/react";
import {
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

import {NextRouter, useRouter} from "next/router";
import {RiSunFill} from "react-icons/ri"
import {supabase} from "../../supabase/createClient";
import useSWR from "swr";

export const Account = () => {

  const {icons : {color : {sun}}} = useTheme()

    const {data : {user : session}} = useSWR("/api/getUserSession")

  const router  = useRouter();

  console.log(session)


    const handelSignOut = async () => {
      const res = await fetch("/api/auth/signout", {
        method: "POST"
      })

      const data = await res.json()

      console.log(data)

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
