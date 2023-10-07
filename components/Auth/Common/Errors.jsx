import {Box, HStack, Text} from "@chakra-ui/react";


const Errors = ({errors}) => {
    return (
        <Box w={"full"} h={55}>
            <HStack>
                {errors?.email?.message && (
                    <Box p={1} rounded={50} bg={"red.500"} />
                )}
                <Text color={"red.500"} fontSize={"xs"}>
                    {errors?.email?.message}
                </Text>
            </HStack>
            <HStack>
                {errors?.password?.message && (
                    <Box p={1} rounded={50} bg={"red.500"} />
                )}
                <Text color={"red.500"} fontSize={"xs"}>
                    {errors?.password?.message}
                </Text>
            </HStack>
            <HStack>
                {errors?.confirmPassword?.message && (
                    <Box p={1} rounded={50} bg={"red.500"} />
                )}
                <Text color={"red.500"} fontSize={"xs"}>
                    {errors?.confirmPassword?.message}
                </Text>
            </HStack>
        </Box>
    );
};

export default Errors;
