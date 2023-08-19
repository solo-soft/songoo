import {HStack, Text, VStack} from "@chakra-ui/react";
import {useEffect} from "react"
import useSWR from "swr";
import Artist from "./Artist";
import Tracks from "./Tracks";
import {useRecoilState, useRecoilValue} from "recoil";
import {ARTISTS_ID, ARTISTS_NAME} from "../../recoil/atoms/atoms";
import getIdArtistByName from "../../graphQl/query/schema/getIdArtistByName";
import getArtistInfoById from "../../graphQl/query/schema/getArtistInfoById";
import Related from "./Related";
import {STATUS} from "../../recoil/atoms/atoms";
import notification from "../../lib/notification";
import {toast} from "react-toastify";
import {useTheme} from "@chakra-ui/react";
import verifyToken from "../../utils/verifyToken";

const Suggest = () => {

    const singerName = useRecoilValue<undefined | string>(ARTISTS_NAME);

    const [singerId, setSingerId] = useRecoilState<undefined | string>(ARTISTS_ID as any);

    const [status, setStatus] = useRecoilState(STATUS)


    const {data: {information} = {}} = useSWR(
        ["/query/artists/FIND_ID_BY_NAME", singerName],
        singerName ? () => getIdArtistByName(singerName) : null,
        {
            refreshInterval: 1000,
            errorRetryInterval: 5000,
            onError: (error, key) => {
                console.log(key)
                toast.error('Connection Lost');
            },
        }
    );

    const {data: {artist, songs, related} = {}, error: ERROR_GET_ARTIST} = useSWR(
        ["query", "/query/artists/getArtist", singerId],
        singerId ? () => getArtistInfoById(singerId) : null,
        {
            keepPreviousData: true,
            refreshInterval: 1000,
            errorRetryInterval: 5000,
            onSuccess: () => setStatus("success"),
            onError: (error, key) => {
                toast.error('Connection Lost');
            },
        }
    );


    const artistPickId = information?.artists?.items[0]?.id;

    useEffect(() => {
        if (artistPickId) {
            setSingerId(artistPickId);
        }
    }, [artistPickId]);


    return (
        <VStack justify="center" align="center" width="full" height="100vh">
            <HStack spacing={5}>
                <Related related={related}/>
                <Artist artist={artist}/>
                <Tracks songs={songs}/>
            </HStack>
        </VStack>
    );
};

export default Suggest;



