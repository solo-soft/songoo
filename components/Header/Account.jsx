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

import { useRouter } from "next/router";
import {RiSunFill} from "react-icons/ri"
import {supabase} from "../../supabase/createClient";

export const Account = () => {

  const {icons : {color : {sun}}} = useTheme()

  const router = useRouter();
  // const supabase = useSupabaseClient();
  const user = useUser();

  const singOut = async () => {

    const { error } = await supabase.auth.signOut()

    if (error) {

      console.log("Error signing out:", error.message);

    } else {

      console.log("Signed out successfully");
      router.push("/auth");
    }
  };


  return (
      <HStack spacing={3}>
        <VStack p={2} rounded={50} bg={"#252525"}>
          <Icon as={RiSunFill} color={sun} fontSize={25}/>
        </VStack>
        <Avatar onClick={singOut} name={user?.email} size={{sm : "sm" , md : "md"}} />
      </HStack>
  );
};
