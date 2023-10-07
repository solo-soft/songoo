import {Button, Stack, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";


const Title = () => {
    const router = useRouter()
    return (
        <Stack direction={["column" , "column" , "row"]} justify={"space-between"}>
            <Text textAlign={"center"} fontWeight={"light"} fontSize={["sm" , "sm" , "sm" , "md" , "2xl"]}>
                Your Playlists
            </Text>
            <Button onClick={() => router.push("/collection/playlists/list")} size={"xs"}>see more</Button>
        </Stack>
    );
};

export default Title;
