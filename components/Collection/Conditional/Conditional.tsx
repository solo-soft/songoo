import { useContext, useId } from "react";
import { CollectionContext } from "../../../provider/CollectionProvider";
import Songs from "./Songs/Songs";
import { Grid, Stack } from "@chakra-ui/react";
import Playlists from "./playlists/Playlists";
import _ from "lodash"
import {TCollection} from "../TCollection";


type TCollectionProperty = "likes" | "recently" | "playlists" | "playlist-songs";

const Conditional = () => {

  const {property, interactionsCollections,}: { property: TCollectionProperty , interactionsCollections : TCollection[] } = useContext(CollectionContext);


  const interactionsCollectionsSort = _.sortBy(interactionsCollections, (items) => -new Date(items.created_at))

    const render =
        property.includes("recently" || "likes") ?
            interactionsCollectionsSort || [] :
            property.includes("playlist-songs") &&
            interactionsCollections?.[0]?.song_info || []





    return (
      <>


        {property === "playlists" ? (
            <Grid templateColumns={"repeat(2, 1fr)"} h={"full"} gap={5} overflow={"auto"}>
              {interactionsCollectionsSort?.map((collection) => (
                  <Playlists key={collection.id} collection={collection} property={property} />
              ))}
            </Grid>
        ) : null}


            <Stack h={"full"} spacing={5} overflow={"auto"}>
              {render?.map((songs, songsIndex) => (
                  <Songs key={songsIndex} songs={songs} songsIndex={songsIndex} property={property} interactionsCollections={interactionsCollectionsSort} />
              ))}
            </Stack>


      </>
  )

};

export default Conditional;
