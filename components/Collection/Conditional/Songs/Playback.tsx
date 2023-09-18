import Controller from "../../../#General/Controller";
import {Stack, useTheme} from "@chakra-ui/react";
import _ from "lodash";
const Playback = ({songs , songsIndex , property , interactionsCollections }) => {

    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);

    const check = property === "playlist-songs"

    const listOfSongs = _.flatMap( interactionsCollections , "song_info")

    return (

        <Stack flex={[.3 , .3 , .1]} role={"group"}>
            <Controller
                flex={"auto"}
                iconSize={["2xl" , "2xl" , "8xl"]}
                symbolSize={[15 , 45]}
                iconColor={fontColor?.secondary}
                symbolColor={fontColor?.secondary}
                indexOfSongs={songsIndex}
                arrayOfSongs={listOfSongs}
                idsOfSongs={songs.id}
                toRecently={false}
            />
        </Stack>

    );
};

export default Playback;
