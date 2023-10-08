import { Icon, VStack } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return router.pathname !== "/" ? (
    <VStack
      cursor={"pointer"}
      onClick={() => router.push("/")}
      p={[2, 2, 1, 1.5, 2]}
      rounded={5}
      bg={"#252525"}
    >
      <Icon as={AiFillHome} color={"#7886FF"} fontSize={25} />
    </VStack>
  ) : null
};

export default Home;
