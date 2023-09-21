import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TCollection } from "../../TCollection";
import {TSongs} from "./Songs";

const Albums = ({ songs }: TSongs) => {
  const router = useRouter();
  return (
    <Text
      fontSize={"sm"}
      onClick={() => router.push(`/album/${songs.album.id}`)}
      noOfLines={1}
      as={"u"}
      textAlign={"center"}
      flex={[0.5, 0.5, 0.5]}
    >
      {songs?.album?.name}
    </Text>
  );
};

export default Albums;
