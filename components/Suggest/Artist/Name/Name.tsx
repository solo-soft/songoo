import { HStack, Spinner, Text, useTheme, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { ARTISTS_NAME, STATUS } from "../../../../recoil/atoms/atoms";
import { TArtist } from "../../../TMainData";

const Name = ({ artist }: { artist: TArtist | undefined }) => {
  const theme = useTheme();
  const { secondary, tertiary } = _.get(theme, "background.section.suggest");
  const artistName = useRecoilValue<string | undefined>(ARTISTS_NAME);
  const status = useRecoilValue<string | undefined>(STATUS);

  return (
    <VStack
      spacing={0}
      justifyContent={"center"}
      w={"full"}
      p={2}
      rounded={15}
      bg={status === "pending" ? secondary : tertiary}
      order={[1, 1, 1, 0]}
    >
      {status === "pending" ? (
        <Spinner thickness="5px" speed="0.65s" size="md" />
      ) : (
        <Text fontSize={["sm", "sm", "sm", "md"]} fontWeight={"light"}>
          It is suggested to you
        </Text>
      )}

      {status === "pending" ? (
        <HStack>
          <Text
            noOfLines={1}
            fontSize={["sm", "sm", "sm", "xl"]}
            fontWeight={"bold"}
          >
            Wait for {artistName}
          </Text>
        </HStack>
      ) : (
        <Text
          noOfLines={1}
          fontSize={["sm", "sm", "sm", "xl"]}
          fontWeight={"bold"}
        >
          {artist?.name}
        </Text>
      )}
    </VStack>
  );
};

export default Name;
