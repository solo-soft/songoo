import {
  Button,
  HStack,
  Stack,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import {
  worldSinger,
  persianSinger,
} from "../../../../utils/randomBestArtists";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ARTISTS_NAME, STATUS } from "../../../../recoil/atoms/atoms";
import _ from "lodash";

const Selection = () => {
  const theme = useTheme();

  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const [region, setRegion] = useState<Array<string>>([]);
  const setArtistsName = useSetRecoilState<string | undefined>(ARTISTS_NAME);
  const setStatus = useSetRecoilState<string>(STATUS);

  const { secondary, tertiary } = _.get(theme, "background.section.suggest");

  const handelChange = async (target: any) => {
    setArtistsName(target);
    setOpenCollapse((prevState) => !prevState);
    setStatus("pending");
  };

  return (
    <>
      <HStack bg={tertiary} px={3} py={2} rounded={8} justify={"space-between"}>
        <Text fontSize={["xs", "xs" , "xs", "sm"]} as={"b"}>
          {" "}
          Select from 100 artists
        </Text>

        <HStack>
          <Button
            size={"xs"}
            onClick={() => {
              setOpenCollapse((prevState) => !prevState);
              setRegion(worldSinger);
            }}
          >
            Global
          </Button>
          <Button
            size={"xs"}
            onClick={() => {
              setOpenCollapse((prevState) => !prevState);
              setRegion(persianSinger);
            }}
          >
            Persian
          </Button>
        </HStack>
      </HStack>

      {openCollapse && (
        <Stack position={"relative"}>
          <Stack
            bg={tertiary}
            position={"absolute"}
            zIndex={1000}
            w={"full"}
            height={530}
            overflow={"auto"}
            rounded={15}
          >
            {region.map((name) => (
              <Text
                fontSize={["sm", "sm" , "sm", "md"]}
                fontWeight={"bold"}
                cursor={"pointer"}
                _hover={{ bg: secondary }}
                p={2}
                onClick={(event: any) => {
                  return handelChange(event?.target?.innerText);
                }}
                key={Math.random()}
              >
                {name}
              </Text>
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Selection;
