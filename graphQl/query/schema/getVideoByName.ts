import {gql} from "@apollo/client";
import {youtubeApolloClient} from "../../client/client";
import {apolloClient} from "../../client/initializeClient";


export const SCHEMA_YOUTUBE_VIDEO = gql`
    query YOUTUBE_VIDEO($name : String) {
        information(name : $name) @rest(type: "GET", path: "/search/?q={args.name}") {
            type
            title
            videoId
            author
            authorId
            authorUrl
            videoThumbnails
            description
            descriptionHtml
            viewCount
            published
            publishedText
            lengthSeconds
            liveNow
            paid
            premium

        }
    }
`



export default async function getVideoByName(singerName : string | undefined) {

    console.log(singerName)

    try {

        const {data , error} = await youtubeApolloClient.query({query : SCHEMA_YOUTUBE_VIDEO, variables: {name: singerName}})
        return data

    }
    catch (e) {
        throw new Error()
    }

}

