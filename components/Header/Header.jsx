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

const Header = ({position = undefined}) => {
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



  const check = router.pathname === "/dashboard" || router.pathname.includes("/artist");

  return (
    <HStack
      position={position || "absolute"}
      w={"full"}
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
          onClick={() => router.push("/collection/likes")}
          opacity={session ? "100%" : "30%"}
          pointerEvents={session ? "auto" : "none"}
          cursor={"pointer"}
          p={2}
          bg={"#252525"}
          rounded={5}
        >
          <Icon as={AiFillHeart} fontSize={25} color={heart} />
        </VStack>
        <VStack
          onClick={() => router.push("/collection/recently-played")}
          opacity={session ? "100%" : "30%"}
          pointerEvents={session ? "auto" : "none"}
          cursor={"pointer"}
          p={2}
          bg={"#252525"}
          rounded={5}
        >
          <Icon as={AiOutlineHistory} fontSize={25} color={history} />
        </VStack>
        <VStack
          onClick={() => router.push("/collection/playlists/list")}
          opacity={session ? "100%" : "30%"}
          pointerEvents={session ? "auto" : "none"}
          cursor={"pointer"}
          p={2}
          bg={"#252525"}
          rounded={5}
        >
          <Icon as={AiFillSave} fontSize={25} color={saved} />
        </VStack>
        <Button
          onClick={() => router.push(check ? "/" : "/dashboard")}
          isDisabled={!session}
        >
          {check ? "Home" : "Dashboard"}
        </Button>
      </HStack>

      <HStack flex={1} justify={"end"}>
        <Account />
      </HStack>
    </HStack>
  );
};

export default Header;
