import {Box, Flex, Stack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ToastContainer} from "react-toastify";


export default function Layout({children}) {

    const router = useRouter();

    const {pathname} = router;

    return (
        <Stack maxW={1990} m={"auto"}>
            <Flex w={"full"} zIndex={2}>
                <Box flex={10}>
                    <ToastContainer position="top-center" closeButton={true}/>
                    {children}
                </Box>
            </Flex>
        </Stack>
    )
}
