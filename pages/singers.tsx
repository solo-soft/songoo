import {Singers} from "../components/Singers";
import {getSeveralArtistsForPickup} from "../graphQl/query/schema/getSeveralArtists";
import {SWRConfig} from "swr";
import verifyToken from "../utils/verifyToken";

export default function singers({fallback}) {
    return (
        <SWRConfig value={{fallback}}>
            <Singers/>
        </SWRConfig>
    )
}

export const getServerSideProps = async ({req}) => {

    const session =  verifyToken(req)


    const GET_SEVERAL_ARTISTS_FOR_PICKUP = await getSeveralArtistsForPickup()

    return {
        props: {
            fallback: {
                "/api/getUserSession" : session ,
                "GET_SEVERAL_ARTISTS_FOR_PICKUP": GET_SEVERAL_ARTISTS_FOR_PICKUP
            }
        }
    }

}