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
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { useContext} from "react";
import _ from "lodash";
import { IconType } from "react-icons";
import { BiSolidDashboard, BiSolidUser } from "react-icons/bi";
import { useRouter } from "next/router";
import { CollectionContext } from "../../../../provider/CollectionProvider/CollectionProvider";
import { TProperty } from "../../TCollection";

type TIcons = {
  [key in TProperty]: IconType;
};

const icons: TIcons = {
  likes: AiFillHeart,
  recently: AiOutlineHistory,
  playlists: AiFillSave,
  "playlist-songs": AiOutlineUnorderedList,
};

const Crumb = () => {
  const router = useRouter();
  const theme = useTheme();

  const { property }: { property: TProperty | undefined } =
    useContext(CollectionContext);

  const fontColor = _.get(theme, `font.color.section.${property}`);

  return (
    <Stack position={"absolute"} top={5} right={5}>
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
                onClick={() => router.push("/collection/Playlists/list")}
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
          <BreadcrumbLink fontWeight={"bold"}>
            <IconButton
              aria-label="dynamic"
              size={"sm"}
              icon={
                property && (
                  <Icon
                    as={icons[property]}
                    color={fontColor?.secondary}
                    fontSize={"xl"}
                  />
                )
              }
            />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Stack>
  );
};

export default Crumb;
