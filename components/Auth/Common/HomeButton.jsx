import {useRouter} from "next/router";
import {IconButton} from "@chakra-ui/react";
import {AiFillHome} from "react-icons/ai";
const HomeButton = () => {

    const router = useRouter()

    return (
        <IconButton
            aria-label={"home"}
            zIndex={1000}
            size={"sm"}
            icon={<AiFillHome size={18} />}
            position={"absolute"}
            top={5}
            left={5}
            onClick={() => router.push("/")}
        />
    );
};

export default HomeButton;
