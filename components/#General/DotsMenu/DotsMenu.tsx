import { BsThreeDots } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuDivider,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Icon } from "@chakra-ui/react";
import {TSongs} from "./TDotsMenu";
import { menuStyle } from "./menuStyle";
import PlaylistItems from "./MenuItems/PlaylistItems";
import AddToPinned from "./MenuItems/AddToPinned";
import AddToLikes from "./MenuItems/AddToLikes";
import GoToAlbums from "./MenuItems/GoToAlbums";
import GoToArtist from "./MenuItems/GoToArtist";
import Share from "./MenuItems/Share";

type TDotsMenu = {
  songs: Partial<TSongs["tracks"][0]>;
  dotsSize?: string | string[] | undefined;
};

const DotsMenu = ({
  songs,
  dotsSize = undefined,
}: TDotsMenu) => {
  return (
    <Menu
      className={menuStyle}
      viewScroll={"close"}
      position={"auto"}
      align={"center"}
      direction={"left"}
      arrow={true}
      menuButton={
        <MenuButton>
          <Icon as={BsThreeDots} fontSize={dotsSize || ["sm" , "sm" , "md" , "sm" , "sm"]} />
        </MenuButton>
      }
      transition
    >
      <PlaylistItems songs={songs} />

      <AddToPinned songs={songs} />

      <MenuDivider />

      <AddToLikes songs={songs} />

      <GoToAlbums songs={songs} />

      <GoToArtist songs={songs} />

      <MenuDivider />

      <Share />
    </Menu>
  );
};

export default DotsMenu;
