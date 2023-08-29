import Title from "./Title";
import Tracks from "./Tracks/Tracks";
import useSWR from "swr";
import getArtistInfoById from "../../../graphQl/query/schema/getArtistInfoById";
import {Divider, Stack} from "@chakra-ui/react";
import { CURRENT_SINGER } from "../../../recoil/atoms/atoms";
import { useRecoilValue } from "recoil";
import getUserDataOnSupabase from "../../../supabase/reads/getUserDataOnSupabase";
import {toast} from "react-toastify";

const TopTenTrack = () => {
  //*Subscription ID selected by the user
  const currentSinger = useRecoilValue(CURRENT_SINGER);
  const { singerId } = currentSinger;
  //*Receive 10 of the best music of the selected artist

  const { data: singerInfo } = useSWR(
    ["/query/schema/getArtistInfoById", singerId],
    singerId ? ([_, singerId]) => getArtistInfoById(singerId) : null,
      {
        errorRetryInterval : 5000,
        shouldRetryOnError : true,
        onErrorRetry : (error, key, config, revalidate, { retryCount })=> {
            if (retryCount >= 3) {
                return;
            }
            setTimeout(revalidate, 5000);
        },
        onError : () => {
          toast.error("Connection have problem")
        }
      }
  );


    return (
    <>
      <Title />
      <Divider/>
      <Stack spacing={0} overflow={"auto"}>
        {singerInfo?.songs?.tracks.map((singerSong, songIndex) => {
          const props = { singerInfo, singerSong, songIndex};
          return <Tracks key={singerInfo.id} {...props} />;
        })}
      </Stack>
    </>
  );
};

export default TopTenTrack;
