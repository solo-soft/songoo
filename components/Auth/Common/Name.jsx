import { Text, VStack } from "@chakra-ui/react";

const Name = () => {
  return (
    <VStack spacing={0}>
      <Text fontSize={["3xl" , "6xl"]} fontWeight={"bold"}>
        Songoo
      </Text>
      <Text fontSize={"small"}>A Simple music streaming app </Text>
    </VStack>
  );
};

export default Name;
