
import {Text} from "@chakra-ui/react";
import {TSpecificAlbums} from "../../TAlbum";

const Description = ({albumInfo} : { albumInfo: TSpecificAlbums | undefined }) => {


    return (
        <>
            <Text fontSize={"2xs"} opacity={"30%"} >
                Copyrights {albumInfo?.albums?.copyrights[0]?.text}
            </Text>
            <Text fontSize={"2xs"} opacity={"30%"} >
                Release at {albumInfo?.albums?.release_date}
            </Text>
        </>
    );
};

export default Description;
