import Suggest from "./Suggest/Suggest";
import Feeling from "./Feeling/Feeling";
import Video from "./Video/Video";
import useSWR from "swr";
import Dashboard from "./User/dashboard";


export const Main = ({ randomSingerUS } : {randomSingerUS : string}) => {

    const {data : {user : session}} = useSWR("/api/getUserSession")

    console.log(session)



    return (
        <>
            {
                session ?
                    <Dashboard/>
                    :
                    <Suggest/>
            }
            <Feeling/>
            <Video randomSingerUS={randomSingerUS}/>
        </>
  );
};
