import {AbsoluteCenter, Box, Stack, Text, useTheme, VStack} from "@chakra-ui/react";
import _ from "lodash";
import { TCollection, TCollectionContext, TProperty } from "../../TCollection";
import { useContext } from "react";
import { CollectionContext } from "../../../../provider/CollectionProvider/CollectionProvider";

const Title = ({ collection }: { collection: TCollection }) => {
  const { property }: TCollectionContext = useContext(CollectionContext);

  const theme = useTheme();
  const fontColor = _.get(theme, `font.color.section.${property}`);

  return (
      <AbsoluteCenter w={"full"}>
          <VStack spacing={0}>
              <Text
                  fontSize={["md", "lg" , "md" , "lg"]}
                  fontWeight={"bold"}
                  color={fontColor?.primary}
                  noOfLines={1}
              >
                  {collection?.title?.toUpperCase()}
              </Text>
              <Text fontSize={"xs"} color={fontColor?.primary}>
                  {" "}
                  {collection?.song_info?.length} Items
              </Text>
          </VStack>
      </AbsoluteCenter>
  );
};

export default Title;
