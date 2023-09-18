import {gql} from "@apollo/client";
import {youtubeApolloClient} from "../../client/client";
import {apolloClient} from "../../client/apolloClients";


const GET_VIDEO = gql`

    query YOUTUBE_VIDEO($name : String) {
        information(name : $name) @rest(type: "GET", path: "/search/?q={args.name}") {
            #            contents {
            #                type 
            #                video {
            #                    title 
            #                    videoId
            #                    publishedTimeText
            #                    thumbnails {
            #                        url
            #                    }
            #                    movingThumbnails {
            #                        url
            #                    }
            #                }
            #            }
            #        }

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

        const {data , error} = await youtubeApolloClient.query({query : GET_VIDEO, variables: {name: singerName}})
        return data

    }
    catch (e) {
        console.log("query / get artists id by name have issue!")
        throw new Error("query / get artists id by name have issue!")
    }

}

