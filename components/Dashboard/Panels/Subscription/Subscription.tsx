import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import useFetchSwr from "../../../../hooks/useFetchSwr";
import Slider from "./Items/Slider/Slider";
import Items from "./Items/Items";
import { TSubscription } from "./TSubscriptons";
import {Box, HStack, Icon, Text, VStack} from "@chakra-ui/react";
import { useId } from "react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import {useRouter} from "next/router";
const Subscription = () => {
  const router = useRouter()
  const { swrFetcher } = useFetchSwr();
  const { data: session } = useSWR("/api/getUserSession");

  const id = useId();

  const {
    data: subscriptions,
  }: { data: Array<TSubscription> | undefined | null } = swrFetcher<
    Array<TSubscription> | undefined | null
  >(
    "/supabase/reads/UserSubscriptions",
    () => getUserDataOnSupabase("UserSubscriptions", session),
    {
      keepPreviousData: false,
    }
  );

  return (
      <Box>
          {
              subscriptions?.length ?
                  <Slider>
                      {subscriptions?.map((subscription) => (
                          <SwiperSlide key={subscription.id}>
                              <Items subscription={subscription} />
                          </SwiperSlide>
                      ))}
                  </Slider>
                  :
                  <VStack
                      w={"full"}
                      justify={"center"}
                      align={"center"}
                      rounded={15}
                      h={[115, 150, 175, 195]}
                      p={2}
                      bg={"#131313"}
                      cursor={"pointer"}
                      onClick={() => router.push("/singers")}
                  >
                      <Icon as={BiSolidMessageSquareAdd} fontSize={"4xl"} />
                      <Text fontSize={"sm"} >
                          Lets subscribe artists 😎
                      </Text>
                  </VStack>

          }
      </Box>
  );
};

export default Subscription;
