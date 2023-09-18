import { Box, Button, HStack } from "@chakra-ui/react";
import Images from "./Images/Images";
import Name from "./Name/Name";
import { TSubscription } from "../TSubscriptons";
import { useRouter } from "next/router";

const Items = ({ subscription }: { subscription: TSubscription }) => {
  const router = useRouter();

  const props = { subscription };

  return (
    <Box
      key={subscription.id}
      w={"full"}
      h={[115, 150, 175, 195]}
      flex={"0 0 auto"}
      rounded={10}
      overflow={"hidden"}
      position={"relative"}
      bg={"#252525"}
      cursor={"pointer"}
    >
      <Images {...props} />

      <HStack
        w={"full"}
        p={[1, 1, 3]}
        justifyContent={["center", "center", "space-between"]}
        bg={"blackAlpha.800"}
        position={"absolute"}
        bottom={0}
      >
        <Name {...props} />
        <Button
          onClick={() => router.push(`/artist/${subscription.singer.id}`)}
          size={"xs"}
        >
          See more
        </Button>
      </HStack>
    </Box>
  );
};

export default Items;
