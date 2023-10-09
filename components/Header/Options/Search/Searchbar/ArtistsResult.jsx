import {
  Box,
  Grid,
  GridItem,
  Img,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const ArtistsResult = ({ artists }) => {


  const renderArtist = (artist, index) => (

    <GridItem
      key={artist?.id}
      p={2}
      colSpan={{base : index === 0 ? 1 : "auto" , md : index === 0 ? 2 : "auto"}}
      bg={"#252525"}
    >
      <Stack
        justify={"flex-start"}
        align={"center"}
        direction={ "row"}
      >
        <Link href={`/artist/${artist.id}`}>
          <Box
            w={{base : index === 0 ? 150 : 50 , md : index === 0 ? 200 : 50}}
            h={{base : index === 0 ? 150 : 50 , md : index === 0 ? 200 : 50}}
            overflow="hidden"
            position="relative"
            cursor="pointer"
            rounded={5}
          >
            <Image
              style={{transition : ".5s"}}
              layout="fill"
              objectFit="cover"
              src={
                index === 0
                  ? artist?.images?.[0]?.url
                  : artist?.images?.[2]?.url
              }
              priority={true}
              placeholder="blur"
              blurDataURL={artist?.images?.[2]?.url}
            />
          </Box>
        </Link>
        <Text
          zIndex={1}
          fontSize={{base : index === 0 ? 15 : 12 , md : index === 0 ? 30 : 13}}
          fontWeight={index === 0 ? "bold" : "normal"}
          color="whiteAlpha.800"
          noOfLines={1}
        >
          {artist?.name}
        </Text>
      </Stack>
    </GridItem>
  );


  return (
    <VStack flex={1}  align="center">
      <Text
        w={"full"}
        fontSize={{base : 20 , md :30}}
        fontWeight={"bold"}
        color={"whiteAlpha.700"}
      >
        Top result
      </Text>
      <Grid
        w="full"
        overflowY="scroll"
        templateColumns={{base : "repeat(1, 1fr)" , md : "repeat(2, 1fr)"}}
        gap={3}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        { artists?.items.map(renderArtist)}
      </Grid>
    </VStack>
  );
};

export default ArtistsResult;
