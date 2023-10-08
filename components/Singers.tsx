import { Box, Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";
import useSWR from "swr";
import getPublicDataOnSupabase from "../supabase/reads/getPublicDataOnSupabase";
import useFetchSwr from "../hooks/useFetchSwr";
import useSubscribeAction from "../hooks/useSubscribeAction";
import { useRouter } from "next/router";
import Header from "./Header/Header";

export const Singers = () => {
  const { swrFetcher } = useFetchSwr();
  const { subscribeAction, checkSubscription } = useSubscribeAction();
  const { data: session } = useSWR("/api/getUserSession");
  const router = useRouter();
  const { data: singerList } = swrFetcher(
    "getSingerLists",
    () => getPublicDataOnSupabase("SingersListGlobal"),
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <title>singers</title>
      <Header position={"relative"} />
      <VStack
        justifyContent={"center"}
        h={"100vh"}
        m={"auto"}
        position={"relative"}
      >
        <VStack p={5} overflow={"auto"} spacing={5}>
          {singerList && (
            <Grid
              gap={3}
              templateColumns={[
                "repeat(2 , 1fr)",
                "repeat(2 , 1fr)",
                "repeat(3 , 1fr)",
                "repeat(4 , 1fr)",
                "repeat(5 , 1fr)",
              ]}
            >
              {_.sortBy(singerList, "name")?.map(({ singer_info }) => {
                return (
                  <Box
                    key={Math.random()}
                    w={[150, 180, 195, 220]}
                    h={[150, 180, 195, 220]}
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
                      <Text
                        onClick={() => router.push(`/artist/${singer_info.id}`)}
                        cursor={"pointer"}
                        fontSize={["xs", "sm", "md"]}
                        noOfLines={1}
                        fontWeight={"bold"}
                      >
                        {singer_info.name}
                      </Text>
                      {session.user ? (
                        <Button
                          variant={"solid"}
                          colorScheme={
                            checkSubscription(singer_info) ? "pink" : "gray"
                          }
                          onClick={() => subscribeAction(singer_info)}
                          size={"xs"}
                        >
                          {checkSubscription(singer_info)
                            ? "Subscribed"
                            : "Subscribe"}
                        </Button>
                      ) : null}
                    </HStack>
                  </Box>
                );
              })}
            </Grid>
          )}
        </VStack>
      </VStack>
    </>
  );
};
