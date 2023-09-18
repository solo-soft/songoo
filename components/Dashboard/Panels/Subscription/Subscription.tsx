import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import useFetchSwr from "../../../../hooks/useFetchSwr";
import Slider from "./Items/Slider/Slider";
import Items from "./Items/Items";
import { TSubscription } from "./TSubscriptons";

const Subscription = () => {
  const { swrFetcher } = useFetchSwr();

  const { data: session } = useSWR("/api/getUserSession");

  const {
    data: subscriptions,
  }: { data: Array<TSubscription> | undefined | null } = swrFetcher<
    Array<TSubscription> | undefined | null
  >(
    "/supabase/reads/UserSubscriptions",
    () => getUserDataOnSupabase("UserSubscriptions", session),
    {
      runError: true,
      keepPreviousData: false,
    }
  );
  return (
    <Slider>
      {subscriptions?.map((subscription) => (
        <SwiperSlide key={subscription.id}>
          <Items subscription={subscription} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default Subscription;
