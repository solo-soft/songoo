import {Icon, Tooltip, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {RiUserHeartFill} from "react-icons/ri";

const Singers = () => {
    const router = useRouter();
    return (
        <Tooltip label={"Singers"} bg={"#71d300"}>
            <VStack
                cursor={"pointer"}
                onClick={() => router.push("/singers")}
                p={[2, 2, 1, 1.5, 2]}
                rounded={5}
                bg={"#252525"}
            >
                <Icon as={RiUserHeartFill} color={"#71d300"} fontSize={25} />
            </VStack>
        </Tooltip>
    );
};

export default Singers;
