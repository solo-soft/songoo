import {gql} from "@apollo/client";


export const USER_VIDEO_SAVED = gql`
    mutation UserVideoSaved($userId : String , $email : String , $videoInfo : [inputs_videoInfo] ) {
        information(userId : $userId , email : $email , videoInfo : $videoInfo){
            id
            videoInfo
        }
    }
`
