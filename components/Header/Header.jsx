import React from "react";
import { Icon, HStack, Text, Box, VStack, Button } from "@chakra-ui/react";
import { Searchbar } from "../Searchbar/Searchbar";
import { Account } from "./Account";
import Greetings from "./Greetings";
import { AiFillHeart, AiFillSave, AiOutlineHistory } from "react-icons/ai";
import { useTheme } from "@chakra-ui/react";
import useSWR from "swr";
import verifyToken from "../../utils/verifyToken";
import { useRouter } from "next/router";

const Header = () => {
  const {
    icons: {
      color: { heart, history, saved },
    },
    typo: {
      color: { primary },
    },
  } = useTheme();

  const router = useRouter();

  const {
    data: { user: session },
  } = useSWR("/api/getUserSession");

  const check = router.pathname === "/dashboard";



  return (
    <HStack
      w={"full"}
      position={check ? "relative" : "absolute"}
      justify={"space-between"}
      py={5}
    >
      <HStack justify={"flex-start"} align={"center"} flex={1}>
        <Text
          fontSize={{ sm: 20, md: "4xl" }}
          fontWeight={"bold"}
          color={primary}
        >
          <Greetings />
        </Text>
        <Searchbar />
      </HStack>

      <HStack flex={1} justify={"center"}>
        <VStack
          opacity={session ? "100%" : "30%"}
          pointerEvents={session ? "auto" : "none"}
          p={2}
          bg={"#252525"}
          rounded={5}
        >
          <Icon as={AiFillHeart} fontSize={25} color={heart} />
        </VStack>
        <VStack
          opacity={session ? "100%" : "30%"}
          pointerEvents={session ? "auto" : "none"}
          p={2}
          bg={"#252525"}
          rounded={5}
        >
          <Icon as={AiOutlineHistory} fontSize={25} color={history} />
        </VStack>
        <VStack
          opacity={session ? "100%" : "30%"}
          pointerEvents={session ? "auto" : "none"}
          p={2}
          bg={"#252525"}
          rounded={5}
        >
          <Icon as={AiFillSave} fontSize={25} color={saved} />
        </VStack>
        <Button onClick={()=> router.push(check ? "/" : "dashboard")} isDisabled={!session}>{check ? "Home" : "Dashboard"}</Button>
      </HStack>

      <HStack flex={1} justify={"end"}>
        <Account />
      </HStack>
    </HStack>
  );
};

export default Header;
