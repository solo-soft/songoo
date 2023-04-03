import {
  AbsoluteCenter,
  Box,
  Button,
  Icon,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  Img,
  Skeleton,
  SkeletonText,
  Divider,
  Stack,
  SkeletonCircle,
  Flex,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAsync } from "react-use";
import Image from "next/image";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import _ from "lodash";
import { CgPlayButtonO } from "react-icons/cg";
import prettyMilliseconds from "pretty-ms";
import { getFavouriteArtists } from "../graphQl/query/database/getFavouriteArtists";
import { hostUser } from "../atoms/atoms";
import { useRecoilValue } from "recoil";
import { getArtistInformation } from "../graphQl/query/api/getArtistInformation";

export const FavouriteArtists = ({ user }) => {
  const [artistID, setArtistID] = useState(null);

  const {
    data: { GET_FAVOURITE_ARTISTS: favouriteArtists },
  } = useSWR(["api", "GET_FAVORITE_ARTISTS", user.id], () =>
    getFavouriteArtists(user.id)
  );

  const { data: { getArtistTopTracks } = {}, isLoading } = useSWR(
    artistID ? ["GET ARTIST DATA", artistID] : null,
    async (key, artistID) => getArtistInformation(artistID),
    { refreshInterval: null }
  );

  useEffect(() => {
    setArtistID(favouriteArtists[0].list[0].id);
  }, [favouriteArtists]);

  const handelSelect = (artisId) => {
    setArtistID(artisId);
  };

  let RenderTopTen;

  if (!getArtistTopTracks) {
    RenderTopTen = Array.from({ length: 10 }).map((_) => (
      <HStack>
        <SkeletonCircle size="10" />
        <VStack align={"flex-start"}>
          <SkeletonCircle size={3} w={180} />
          <SkeletonCircle size={3} w={150} />
        </VStack>
      </HStack>
    ));
  }
  if (getArtistTopTracks) {
    RenderTopTen = getArtistTopTracks?.tracks?.map(
      ({ duration_ms, name, id, album: { artists, images } }) => {
        return (
          <HStack px={2} rounded={50} key={id} bg={"whiteAlpha.200"}>
            <Box flex={0.3} role={"group"} position={"relative"}>
              <Skeleton
                startColor={"whiteAlpha.300"}
                endColor={"whiteAlpha.400"}
                rounded={"full"}
                isLoaded={!isLoading}
              >
                <Box
                  w={55}
                  h={55}
                  rounded={"full"}
                  overflow={"hidden"}
                  position={"relative"}
                  _groupHover={{ opacity: "30%" }}
                  transition={".2s"}
                >
                  <Image
                    placeholder={"blur"}
                    blurDataURL={images[2].url}
                    src={images[1].url}
                    quality={"50"}
                    layout={"fill"}
                    sizes={"fill"}
                    objectFit={"cover"}
                    style={{ position: "absolute", borderRadius: "100%" }}
                  />
                </Box>
              </Skeleton>
              <AbsoluteCenter>
                <Icon
                  display={"none"}
                  cursor={"pointer"}
                  _groupHover={{ display: "block" }}
                  fontSize={25}
                  as={CgPlayButtonO}
                />
              </AbsoluteCenter>
            </Box>

            <VStack flex={1} spacing={0} align={"flex-start"}>
              <SkeletonText
                startColor={"whiteAlpha.300"}
                endColor={"whiteAlpha.400"}
                noOfLines={3}
                spacing="1"
                isLoaded={!isLoading}
              >
                <Text w={150} noOfLines={1} fontWeight={"bold"} fontSize={"md"}>
                  {name}
                </Text>
                <Text w={150} noOfLines={2} fontSize={"xs"}>
                  {artists?.[0]?.name} {artists?.[1]?.name}
                </Text>
                <Text w={150} noOfLines={2} fontSize={"2xs"}>
                  {prettyMilliseconds(duration_ms, {
                    secondsDecimalDigits: 0,
                    colonNotation: true,
                  })}
                </Text>
              </SkeletonText>
            </VStack>
          </HStack>
        );
      }
    );
  }

  return (
    <HStack w={"full"} h={"auto"} justify={"center"} my={18} rounded={"2xl"}>
      {
        <VStack w={"full"}>
          <VStack w={"full"} align={"start"}>
            <Text
              w={"full"}
              fontSize={40}
              fontWeight={"bold"}
              color={"whiteAlpha.600"}
            >
              Top 10 your favourite artist
            </Text>
          </VStack>

          <HStack w={"full"}>
            <ScrollContainer
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                cursor: "pointer",
              }}
            >
              {favouriteArtists?.[0]?.list?.map(({ id, images, name }) => {
                return (
                  <Box key={id}
                    flex={"none"}
                    p={2}
                    position={"relative"}
                    overflow={"hidden"}
                    rounded={"full"}
                  >
                    <Image
                      style={{
                        borderRadius: "100%",
                        transition: ".1s",
                        opacity: id === artistID ? "50%" : "100%",
                        transform: id === artistID ? "scale(.95)" : "scale(1)",
                        position: "absolute",
                        zIndex: 1,
                      }}
                      width={200}
                      height={200}
                      onClick={() => handelSelect(id)}
                      placeholder={"blur"}
                      quality={100}
                      blurDataURL={images[2].url}
                      src={images[0].url}
                    />

                    {id === artistID && (
                      <AbsoluteCenter w={"full"} zIndex={2}>
                        <Text
                          textAlign={"center"}
                          fontWeight={"bold"}
                          fontSize={22}
                        >
                          {name}
                        </Text>
                      </AbsoluteCenter>
                    )}
                  </Box>
                );
              })}
            </ScrollContainer>
          </HStack>

          <VStack w={"full"}>
            <Grid w={"full"} h={150} gap={2} templateColumns={"repeat(5, 1fr)"}>
              {RenderTopTen}
            </Grid>
          </VStack>
        </VStack>
      }
    </HStack>
  );
};
