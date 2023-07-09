"use client"
import {HStack, Stack, Text, useTheme, VStack} from "@chakra-ui/react";
import {Context, createContext, useEffect, useReducer, useState} from "react"

import {Box} from "@chakra-ui/react";
import useSWR from "swr";
import Artist from "./Artist";
import Tracks from "./Tracks";
import {useRecoilState, useRecoilValue} from "recoil";
import {ARTISTS_ID , ARTISTS_NAME} from "../recoil/atoms/atoms";
import getIdArtistByName from "../graphQl/query/schema/getIdArtistByName";
import getArtistInfoById from "../graphQl/query/schema/getArtistInfoById";
import {randomSingerUS, randomSingerIR} from "../utils/randomBestArtists";
import {Suspense} from "react";
import {currentArtistsId} from "../recoil/selector/selector";
import {useQuery} from "@apollo/client";
import Related from "./Related";
import {useRecoilValueLoadable} from "recoil";


export const SuggestionContext: Context<any> = createContext({})

const Parent = () => {


    const [artistId , setArtistId] = useRecoilState(ARTISTS_ID)

    const artistName = useRecoilValue(ARTISTS_NAME)

    const {data : {information} = {} , isLoading, error : errorss} = useSWR(["/getArtistsId"  , artistName],  artistName ? ([_, artistName]) => getIdArtistByName(artistName) : null)

    console.log(isLoading)

    if (errorss) return <Text>fuck u got a error</Text>


    const artistPickId = information?.artists.items[0].id



    useEffect(() => {
        if (artistPickId) {
            setArtistId(artistPickId)
        }
    } , [artistPickId])


    const {
        data: {artist, songs, related} = {},
        mutate,
        error,
        isLoading : iisLoading
    } = useSWR(["query", "/query/artists/getArtist" , artistId ], artistId ? ([key, url , artistId]) => getArtistInfoById(artistId) : null, {
        refreshInterval: 0,
        revalidateOnFocus: false,
    })


    if (error) return <Text>fuck u got a error</Text>



    return (
        <VStack  justify={"center"} align={"center"} width={"full"} height={"100vh"}>


            <HStack spacing={5}>
                {
                    !isLoading && !iisLoading && <>
                        <Related related={related}/>
                        <Artist artist={artist}/>
                        <Tracks songs={songs}/>
                    </>
                }
            </HStack>

        </VStack>
    );
};

export default Parent;
