import Title from "./Title";
import Tracks from "./Tracks/Tracks";
import { Divider, Stack } from "@chakra-ui/react";
import { CURRENT_SINGER } from "../../../../recoil/atoms/atoms";
import { useRecoilValue } from "recoil";
import useFetchSwr from "../../../../hooks/useFetchSwr";
import { SCHEMA_ARTISTS_INFO } from "../../../../graphQl/query/schema/getArtistInfoById";
import fetcherQuery from "../../../../graphQl/query/fetcher/fetcherQuery";
import { TCurrentSinger } from "./TTopTrack";
import {TArtistInfo, TSongs} from "../../../TMainData";

const TopTenTrack = () => {

  //?Subscription ID selected by the user
  const { singerId }: { singerId: string | null } =
    useRecoilValue<TCurrentSinger>(CURRENT_SINGER);

  const { swrFetcher } = useFetchSwr();

  //?Receive 10 of the best music of the selected artist
  const { data: singerInfo }: { data: TArtistInfo | undefined } =
    swrFetcher<TArtistInfo>(
      ["/query/schema/getArtistInfoById", singerId],
      singerId
        ? ([_, singerId]) =>
            fetcherQuery(SCHEMA_ARTISTS_INFO, { artistId: singerId })
        : null,
      {
        runError: true,
        keepPreviousData: false,
      }
    );


  return (
    <>
      <Title />
      <Divider />
      <Stack spacing={3} overflow={"auto"}>
        {singerInfo?.songs?.tracks.map((songs , songIndex : number) => {
          const props = { singerInfo, songs, songIndex };
          return <Tracks key={songs?.id} {...props} />;
        })}
      </Stack>
    </>
  );
};

export default TopTenTrack;
