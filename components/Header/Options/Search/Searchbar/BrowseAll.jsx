import React from "react";
import { Grid, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import useSWR from "swr";
import { getSeveralCategories } from "../../../../../graphQl/query/schema/getSeveralCategories";

const BrowseAll = () => {
  const { data } = useSWR("/graphql/query/schema/getSeveralCategories", () =>
    getSeveralCategories()
  );

  return (
    <Grid
        overflow={"auto"}
        h={[550, 450]}
      templateColumns={["repeat(2 , 1fr)" , "repeat(3 , 1fr)" , "repeat(5 , 1fr)" , "repeat(6 , 1fr)"]}
      gap={3}
    >
      {data?.browser?.categories?.items.map((data) => {
        return (
          <VStack
            key={data.id}
            w={"full"}
            h={[120 , 135 , 95]}
            position={"relative"}
            rounded={5}
          >
            <Image
              style={{transition : ".5s"}}
              layout={"fill"}
              objectFit={"cover"}
              src={data.icons[0].url || "/"}
              placeholder={"blur"}
              blurDataURL={data?.icons[0]?.url || "/"}
            />
            <Text
              position={"absolute"}
              bottom={1}
              fontSize={13}
              fontWeight={"bold"}
            >
              {data.name}
            </Text>
          </VStack>
        );
      })}
    </Grid>
  );
};

export default BrowseAll;
