import _ from "lodash";
import deleteUserSubscriptions from "../supabase/delete/deleteUserSubscriptions";
import { v4 as uuidv4 } from "uuid";
import setUserDataOnSupabase from "../supabase/inserts/setUserDataOnSupabase";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import useFetchSwr from "./useFetchSwr";
import useSWR from "swr";
import { useToast } from "@chakra-ui/react";
import { TArtist } from "../components/Artist/TArist";

type TSubscriptions = {
  id: string;
  userId: string;
  singer: {
    id: string;
    name: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
  };
  created_at: string;
  email: string;
};

const useSubscribeAction = () => {
  const { swrFetcher } = useFetchSwr();
  const toast = useToast();

  const { data: session } = useSWR("/api/getUserSession");

  const {
    data,
    mutate,
  }: { data: TSubscriptions[] | undefined | null; mutate: Function } =
    swrFetcher<TSubscriptions[] | undefined | null>(
      "/supabase/reads/getUserSubscriptions",
      session.user ? () => getUserDataOnSupabase("UserSubscriptions", session) : null,
      {
        keepPreviousData: true,
        onFocus: true,
      }
    );

  return {
    subscribeAction: async (artist: TArtist) => {
      const subscribed = _.find(data, { singer: { id: artist.id } });

      if (subscribed && data && session.user) {
        //*Returns the new array of removed elements

        const unSubscribe = _.remove(
          data,
          (value) => value.id !== subscribed.id
        );
        try {
          await mutate(
            deleteUserSubscriptions("UserSubscriptions", subscribed.id),
            {
              optimisticData: [...unSubscribe],
              populateCache: false,
              rollbackOnError: true,
              revalidate: true,
            }
          );
          toast({
            title: "Successfully remove the item.",
            status: "info",
            position: "bottom-left",
          });
        } catch (e) {
          toast({
            title: "Failed to remove the item.",
            status: "info",
            position: "bottom-left",
          });
        }
      } else {

        const singerInfo = {
          id: uuidv4(),
          userId: session.user.id,
          email: session.user.email,
          created_at: new Date(),
          singer: artist,
        };

        try {
          if (session.user) {
            await mutate(setUserDataOnSupabase("UserSubscriptions", singerInfo), {
              optimisticData: data && [...data, singerInfo],
              populateCache: false,
              rollbackOnError: true,
              revalidate: false,
            });
            toast({
              title: "Successfully added the new item.",
              status: "info",
              position: "bottom-left",
            });
          }


        } catch (e) {
          toast({
            title: "Failed to add the new item.",
            status: "info",
            position: "bottom-left",
          });
        }
      }
    },
    checkSubscription: (artist: TArtist) => {
      return _.find(data, { singer: { id: artist.id } });
    },
  };
};

export default useSubscribeAction;
