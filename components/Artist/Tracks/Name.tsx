import { Box, Stack, Text, useTheme } from "@chakra-ui/react";
import _ from "lodash";

const Name = ({track}) => {
  const theme = useTheme();
  const { contrast } = _.get(theme, "font.color.section.artist");


  return (
    <Box>
      <Text fontSize={15} noOfLines={1} fontWeight={"bold"} color={contrast}>
        {track.name}
      </Text>

      <Text noOfLines={1} fontSize={"xs"} color={contrast}>
        {track.album.name}
      </Text>
    </Box>
  );
};

export default Name;
