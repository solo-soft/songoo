import {Box, HStack} from "@chakra-ui/react";
import Image from "next/image";
import Name from "../../TopTracks/Tracks/Name/Name";
import {TSongs} from "../../../../TMainData";

const Images = ({songs} : {songs: Partial<TSongs["tracks"][0]>}) => {

    return (

            <Box
                p={[6, 8, 8 , 7 , 8]}
                position={"relative"}
                rounded={5}
                overflow={"hidden"}
            >
                <Image
                    src={songs?.album?.images?.[1].url || "/"}
                    placeholder={"blur"}
                    blurDataURL={songs?.album?.images?.[2].url || "/"}
                    layout={"fill"}
                    objectFit={"cover"}
                />
            </Box>


    );
};

export default Images;
