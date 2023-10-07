import Controller from "../../../#General/Controller";
import {Stack, useTheme} from "@chakra-ui/react";
import _ from "lodash";
import {TCollection, TCollectionContext} from "../../TCollection";
import {useContext} from "react";
import {CollectionContext} from "../../../../provider/CollectionProvider/CollectionProvider";
import {TSongs} from "./Songs";
import useSWR from "swr";
const Playback = ({songs , songsIndex} : TSongs) => {

    const { property, collectionInfo }: TCollectionContext = useContext(CollectionContext);
    const { data: session } = useSWR("/api/getUserSession");
    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);
    const listOfSongs : TCollection["song_info"] = _.flatMap( collectionInfo , "song_info")

    return (

        <Stack flex={[.3 , .3 , .2]} role={"group"}>
            <Controller
                session={session}
                flex={"auto"}
                iconSize={["2xl" , "2xl" , "6xl"]}
                symbolSize={[5 , 25]}
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
