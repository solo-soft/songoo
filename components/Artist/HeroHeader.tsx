import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Button, Stack, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import { TArtist } from "./TArist";
import useSubscribeAction from "../../hooks/useSubscribeAction";

const HeroHeader = ({ artist }: { artist: TArtist | undefined }) => {
  const { data: session } = useSWR("/api/getUserSession");

  const router = useRouter();

  const fac = new FastAverageColor();

  const { data: dynamicColor } = useSWR(["/color", router], () =>
    fac.getColorAsync(artist?.images[0]?.url || "/")
  );

  const { subscribeAction, checkSubscription } = useSubscribeAction();

  return (
    <>
      <Stack
        direction={["column", "column", "row"]}
        w={"full"}
        justify={"center"}
        align={"center"}
        h={320}
        spacing={[2, 2, 5]}
      >
        <Stack
          w={[210, 210, 250 , 280]}
          h={[210, 210, 250 , 280]}
          position={"relative"}
          overflow={"hidden"}
          rounded={[25, 25, "full"]}
          opacity={"65%"}
        >
          <Image
            style={{ transition: ".5s" }}
            layout={"fill"}
            objectFit={"cover"}
            src={artist?.images[0]?.url || "/"}
            placeholder={"blur"}
            blurDataURL={artist?.images[2]?.url || "/"}
            priority
          />
        </Stack>

        <Stack>
          <Text
            noOfLines={1}
            bgGradient={
              dynamicColor
                ? `linear-gradient(to-r, ${dynamicColor?.rgba} ,  ${dynamicColor?.rgba} , #ffff )`
                : "linear-gradient(to-r, #ffff , #ffff )"
            }
            bgClip={"text"}
            fontSize={["3xl", "3xl", "4xl" , "8xl"]}
            fontWeight={"bold"}
          >
            {artist?.name}
          </Text>

          <>
            {artist && checkSubscription(artist) ? (
              <Button
                onClick={() => subscribeAction(artist)}
                colorScheme={"purple"}
              >
                Subscribed
              </Button>
            ) : (
              artist && session.user &&  (
                <Button
                  onClick={() => subscribeAction(artist)}
                  colorScheme={"gray"}
                >
                  Subscribe
                </Button>
              )
            )}
            {
              !session.user && (
                    <Button
                        onClick={()=> router.push("/login")}
                        colorScheme={"gray"}
                    >
                      Log in to subscribe
                    </Button>
                )
            }
          </>
        </Stack>
      </Stack>
    </>
  );
};

export default HeroHeader;
