import {selector} from "recoil";
import {GetRecoilValue} from "recoil";
import {ARTISTS_ID} from "../atoms/atoms";
import getIdArtistByName from "../../graphQl/query/schema/getIdArtistByName";
import {randomSingerUS} from "../../utils/randomBestArtists";

export const currentArtistsId = selector({
    key : "CurrentArtistId",
    get : async ({get} : {get : GetRecoilValue} ) =>  {

        const pickedArtist = get(ARTISTS_ID)

        if (!pickedArtist) {
            const {information : {artists : {items}}} = await getIdArtistByName(randomSingerUS as string)
            return items[0].id
        }

        return  pickedArtist

    }
})
