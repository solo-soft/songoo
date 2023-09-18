import {
  Icon,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { BiDotsHorizontal } from "react-icons/bi";
import { TArtist, TRelated } from "../../TMainData";
import Images from "./Images/Images";
import Title from "./Title/Title";
import {useRouter} from "next/router";

const Related = ({ related }: { related: TRelated | undefined }) => {
  const router = useRouter()
  return (
    <>
      <Title />
      <Stack
        display={["grid", "grid" , "grid", "flex"]}
        placeItems={"center"}
        flexDirection={"column"}
        gap={2}
        gridTemplateColumns={"repeat(4,1fr)"}
        px={[5, 5, 0]}
        direction={["row", "row", "column"]}
        order={[3, 3 , 3 , 1]}
      >
        {related?.artists?.slice(0, 7).map((artist: TArtist) => (
          <Images key={artist?.id} artist={artist} />
        ))}
        <VStack
          display={["flex", "flex", "none"]}
          justifyContent={"center"}
          bg={"#252525"}
          rounded={"full"}
          cursor={"pointer"}
          w={[65, 85, 57]}
          h={[65, 85, 57]}
        >
          <Icon as={BiDotsHorizontal} fontSize={"2xl"} onClick={() => router.push("/singers")}/>
        </VStack>
      </Stack>
    </>
  );
};

export default Related;
