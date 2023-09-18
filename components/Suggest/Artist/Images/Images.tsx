import { Button, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import _ from "lodash";
import { useTheme } from "@chakra-ui/react";
import { TArtist } from "../../../TMainData";

const Images = ({ artist }: { artist: TArtist | undefined }) => {
  const theme = useTheme();
  const router = useRouter();
  const { secondary, tertiary } = _.get(theme, "background.section.suggest");
  return (
    <Stack
      w={["full", 450, 530 , 330]}
      h={[210, 250, 330 , 330]}
      rounded={[15, 15 , 15, 20]}
      overflow={"hidden"}
      position={"relative"}
      bg={tertiary}
      order={[0, 0 , 0, 1]}
      m={"auto"}
    >
      <Image
        sizes={"(max-width: 230px)"}
        layout={"fill"}
        objectFit={"cover"}
        placeholder={"blur"}
        blurDataURL={artist?.images?.[2]?.url || "/"}
        alt={artist?.name}
        src={artist?.images?.[0]?.url || "/"}
      />

      <HStack
        w={"full"}
        bg={"blackAlpha.700"}
        position={"absolute"}
        justify={"space-between"}
        bottom={0}
        p={2}
      >
        <Button
          onClick={() => router.push(`/artist/${artist?.id}`)}
          size={"xs"}
        >
          See more
        </Button>
        <Button size={"xs"}>Subscribe</Button>
      </HStack>
    </Stack>
  );
};

export default Images;
