import React, {useState} from 'react';
import {Icon} from "@chakra-ui/react";
import {BsHeart , BsHeartFill} from "react-icons/bs";
import setUserDataOnSupabase from "../../../../supabase/inserts/setUserDataOnSupabase";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import {TSession} from "../../../Type";
import {TUserPlaylists} from "../../Type";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import _ from "lodash"
import {toast} from "react-toastify";
import deleteUserSubscriptions from "../../../../supabase/delete/deleteUserSubscriptions";

const Likes = ({singerSong}) => {


    const { data: session } : {data : TSession | undefined} = useSWR("/api/getUserSession");

    const {
        data: userLikedSong,
        mutate
    }  = useSWR("/supabase/reads/UserLikedSong", () =>
        getUserDataOnSupabase("UserLikedSong", session)
    );

    const likedSong = _.find(userLikedSong , {"song_info" : {id : singerSong.id}})

    const handelAddToLiked = () => {

        const songInfo = {
            id: uuidv4(),
            userId: session?.user.id,
            create_by: session?.user.email,
            song_info: singerSong,
            created_at: new Date()
        }

        if (likedSong) {
            //*Returns the new array of removed elements
            const unLikedSong = _.remove(userLikedSong, (value) => value.id !== likedSong.id);

            return mutate(deleteUserSubscriptions("UserLikedSong" , likedSong.id) , {
                optimisticData : [...unLikedSong],
                revalidate : true,
                rollbackOnError : true,
                populateCache : false
            })
        }
        else  {
            return mutate(setUserDataOnSupabase("UserLikedSong" , songInfo) , {
                optimisticData : [...userLikedSong , songInfo],
                revalidate : true,
                rollbackOnError : true,
                populateCache : false
            })
        }
    }

    return (
        <Icon onClick={handelAddToLiked} fontSize={"sm"} color={"#7885FF"}  as={likedSong ? BsHeartFill : BsHeart}/>
    );
};

export default Likes;
