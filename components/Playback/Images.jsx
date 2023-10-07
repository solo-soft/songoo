import {Box} from "@chakra-ui/react";
import Image from "next/image";
import {useRecoilState, useRecoilValue} from "recoil";
import {PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";


const Images = () => {
    const { indexOfSongs, arrayOfSongs } = useRecoilValue(PLAYBACK_INFORMATION);
    const {album: { images } = {}} = arrayOfSongs[indexOfSongs] ?? {};

    return (
        <Box p={25} rounded={5} overflow={"hidden"} position={"relative"}>
            <Image src={images?.[0]?.url} layout={"fill"} objectFit={"cover"} />
        </Box>
    );
};

export default Images;
