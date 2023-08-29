import {Box, Stack, Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";

const Title = ({ name }) => {

  const theme = useTheme()
  const bg = _.get(theme, "background.section.artist");
  const color = _.get(theme, "font.color.section.artist");


  return (
    <Text
      bottom={0}
      w={"full"}
      textAlign={"center"}
      position={"absolute"}
      bg={bg.secondary}
      p={1}
      fontSize={"sm"}
      noOfLines={1}
      fontWeight={"bold"}
      color={color.primary}
    >
      {name}
    </Text>
  );
};

export default Title;
