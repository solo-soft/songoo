import { Box, Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";
import useSWR from "swr";
import getPublicDataOnSupabase from "../supabase/reads/getPublicDataOnSupabase";
import useFetchSwr from "../hooks/useFetchSwr";
import useSubscribeAction from "../hooks/useSubscribeAction";

export const Singers = () => {
  const { swrFetcher } = useFetchSwr();
  const { subscribeAction , checkSubscription } = useSubscribeAction();
  const { data: session } = useSWR("/api/getUserSession");

  const { data: singerList } = swrFetcher(
    "getSingerLists",
    () => getPublicDataOnSupabase("SingersListGlobal"),
    {
      keepPreviousData: true,
    }
  );

  return (
    <VStack
      justifyContent={"center"}
      h={"100vh"}
      m={"auto"}
      position={"relative"}
    >
      <title>singers</title>

      <VStack h={"32rem"} overflow={"auto"} spacing={5}>
        {singerList && (
          <Grid gap={3} templateColumns={"repeat(4 , 1fr)"}>
            {_.sortBy(singerList, "name")?.map(({ singer_info }) => {
              return (
                <Box
                  key={singer_info.id}
                  w={250}
                  h={250}
                  position={"relative"}
                  rounded={20}
                  overflow={"hidden"}
                >
                  <Image
                    layout={"fill"}
                    objectFit={"cover"}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL={singer_info?.images?.[2]?.url || "/"}
                    src={singer_info?.images?.[0]?.url || "/"}
                  />

                  <HStack
                    w={"full"}
                    justifyContent={"space-between"}
                    bottom={0}
                    position={"absolute"}
                    bg={"blackAlpha.600"}
                    p={3}
                  >
                    <Text fontSize={"lg"} noOfLines={1} fontWeight={"bold"}>
                      {singer_info.name}
                    </Text>
                    <Button
                      variant={"solid"}
                      colorScheme={checkSubscription(singer_info) ? "pink" : "gray"}
                      onClick={() => subscribeAction(singer_info)}
                      size={"sm"}
                    >
                      {checkSubscription(singer_info) ? "Subscribed" : "Subscribe"}
                    </Button>
                  </HStack>
                </Box>
              );
            })}
          </Grid>
        )}
      </VStack>
    </VStack>
  );
};
