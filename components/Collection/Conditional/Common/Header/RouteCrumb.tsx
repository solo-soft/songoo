import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  AiFillSave,
  AiFillHome,
  AiFillHeart,
  AiOutlineHistory,
  AiOutlineUser,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import React, { useContext, useEffect } from "react";
import _ from "lodash";
import { CollectionContext } from "../../../../../provider/CollectionProvider";
import { IconType } from "react-icons";
import { BiSolidDashboard, BiSolidUser } from "react-icons/bi";
import { useRouter } from "next/router";

type TCollectionProperty =
  | "likes"
  | "recently"
  | "playlists"
  | "playlist-songs";

type TIcons = {
  [key in TCollectionProperty]: IconType;
};

const icons: TIcons = {
  likes: AiFillHeart,
  recently: AiOutlineHistory,
  playlists: AiFillSave,
  "playlist-songs": AiOutlineUnorderedList,
};

const RouteCrumb = () => {
  const router = useRouter();
  const theme = useTheme();

  const { property }: { collectionProperty: TCollectionProperty } =
    useContext(CollectionContext);

  const fontColor = _.get(theme, `font.color.section.${property}`);

  return (
    <Stack flex={0.5} align={"flex-end"}>
      <Breadcrumb spacing={1} separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem>
          <HStack>
            <Tooltip label="Home">
              <IconButton
                onClick={() => router.push("/")}
                size={"sm"}
                aria-label="Call Segun"
                icon={
                  <Icon
                    as={AiFillHome}
                    color={fontColor?.tertiary}
                    fontSize={"xl"}
                  />
                }
              />
            </Tooltip>
            <Tooltip label="Dashboard">
              <IconButton
                onClick={() => router.push("/dashboard")}
                size={"sm"}
                aria-label="Call Segun"
                icon={
                  <Icon
                    as={BiSolidDashboard}
                    color={fontColor?.tertiary}
                    fontSize={"xl"}
                  />
                }
              />
            </Tooltip>
          </HStack>
        </BreadcrumbItem>

        {property === "playlist-songs" && (
          <BreadcrumbItem>
            <Tooltip label="playlists">
              <IconButton
                onClick={() => router.push("/collection/playlists/list")}
                size={"sm"}
                aria-label="Call Segun"
                icon={
                  <Icon
                    as={AiFillSave}
                    color={fontColor?.tertiary}
                    fontSize={"xl"}
                  />
                }
              />
            </Tooltip>
          </BreadcrumbItem>
        )}

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink fontWeight={"bold"} href="#">
            <IconButton
              aria-label="Call Segun"
              icon={
                <Icon
                  as={icons[property]}
                  color={fontColor?.secondary}
                  fontSize={"2xl"}
                />
              }
            />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Stack>
  );
};

export default RouteCrumb;
