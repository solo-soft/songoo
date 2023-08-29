import Controller from "../../../Dashboard/TopTenTracks/Tracks/Controller";
import {Stack, useTheme} from "@chakra-ui/react";
import _ from "lodash";
const Playback = ({songs , songsIndex , property , interactionsCollections , playlistSongs}) => {

    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);

    const check = property === "playlist-songs"


    const listOfSongs = _.flatMap(check ? playlistSongs : interactionsCollections , "song_info")


    return (

        <Stack flex={.1} role={"group"}>
            <Controller
                flex={"auto"}
                iconSize={"8xl"}
                symbolSize={[15 , 45]}
                iconColor={fontColor?.secondary}
                indexOfSongs={songsIndex}
                arrayOfSongs={listOfSongs}
                idsOfSongs={check ? songs.id : songs.song_info.id}
                toRecently={false}
            />
        </Stack>

    );
};

export default Playback;
