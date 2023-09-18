import {Button, HStack, Stack, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

const Title = () => {

    const router = useRouter()

    return (
        <Stack direction={["column" , "column" , "column" , "row"]} justify={["center" , "center" , "center" , "space-between"]} >
            <Text textAlign={"center"} fontWeight={"light"} fontSize={["sm" , "sm" , "sm" , "md" , "2xl"]}>
                Recently Played
            </Text>
            <Button onClick={() => router.push("/collection/recently-played")} size={"xs"}>see more</Button>
        </Stack>
    );
};

export default Title;
