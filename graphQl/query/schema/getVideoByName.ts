import {gql} from "@apollo/client";
import {youtubeApolloClient} from "../../client/client";
import {apolloClient} from "../../../utils/apolloClients";


const GET_VIDEO = gql`

    query YOUTUBE_VIDEO($name : String) {
        information(name : $name) @rest(type: "GET", path: "/search/?q={args.name}&hl=en&gl=US") {
            contents {
                type 
                video {
                    title 
                    videoId
                    publishedTimeText
                    thumbnails {
                        url
                    }
                    movingThumbnails {
                        url
                    }
                }
            }
        }
    }
`



export default async function getVideoByName(randomSingerUS : string | undefined , singerName : string | undefined) {

    console.log(singerName)

    try {

        const {data , error} = await youtubeApolloClient.query({query : GET_VIDEO, variables: {name: singerName || randomSingerUS}})
        return data

    }
    catch (e) {
        console.log("query / get artists id by name have issue!")
        throw new Error("query / get artists id by name have issue!")
    }

}

