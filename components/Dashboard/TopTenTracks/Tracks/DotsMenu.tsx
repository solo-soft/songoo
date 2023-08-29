import { BsThreeDots } from "react-icons/bs";
import {
  IS_OPEN_MODAL_CREATE_PLAYLIST,
  SELECTED_THE_SONG_BY_USER,
} from "../../../../recoil/atoms/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import { TSession } from "../../../Type";
import { TUserPlaylists } from "../../Type";
import updateUserDataOnSupabase from "../../../../supabase/update/updateUserDataOnSupabase";
import _ from "lodash";
import { toast } from "react-toastify";
import { mutate } from "swr";
import setUserDataOnSupabase from "../../../../supabase/inserts/setUserDataOnSupabase";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { PinnedContext } from "../../../../provider/PinnedProvider";
import { css } from "@emotion/css";
import {Icon} from "@chakra-ui/react";

const DotsMenu = ({ songs , dotsSize = undefined }) => {
  const { data: session }: { data: TSession | undefined } = useSWR(
    "/api/getUserSession"
  );

  const { data: userPlaylists }: { data: Array<TUserPlaylists> | undefined } =
    useSWR("/supabase/reads/UserPlaylists", () =>
      getUserDataOnSupabase("UserPlaylists", session)
    );

  const pinnedSongs = useContext(PinnedContext);

  //*Specify open or closed state of the modal
  const setIsModalCreatePlaylist = useSetRecoilState(
    IS_OPEN_MODAL_CREATE_PLAYLIST
  );

  //*Send the selected data to the modal
  const [selectedSong, setSelectedSongByUser] = useRecoilState(
    SELECTED_THE_SONG_BY_USER
  );

  const handelCreatePlaylist = (songInfo) => {
    setSelectedSongByUser(songInfo);
    setIsModalCreatePlaylist(true);
  };

  const handelAddToPlaylist = async (playlists) => {
    //*Find a playlist whose id is equal to the selected id
    const foundItems = _.find(userPlaylists, ["id", playlists.id]);

    //*Checking the presence of the selected song in the current playlist
    const check = _.some(foundItems?.song_info, ["id", songs.id]);

    if (check) {
      toast.error(
        `This song has already been added to the ${foundItems?.title} playlist`
      );
    } else {
      const updatePlaylist = [
        ...playlists.song_info,
        {
          album: songs.album,
          artists: songs.artists,
          duration_ms: songs.duration_ms,
          id: songs.id,
          name: songs.name,
          preview_url: songs.preview_url,
        },
      ];
      try {
        mutate(
          "/supabase/reads/UserPlaylists",
          updateUserDataOnSupabase(
            "UserPlaylists",
            updatePlaylist,
            playlists.id
          ),
          {
            rollbackOnError: true,
            populateCache: false,
          }
        );

        toast.success(
          `The song was added to the ${foundItems?.title} playlist`
        );
      } catch (e) {
        toast.error(
          `something went wrong in add to the ${foundItems?.title} playlist`
        );
      }
    }
  };

  const handelAddToPin = async () => {
    const songInfo = {
      id: uuidv4(),
      userId: session?.user.id,
      created_by: session?.user.email,
      created_at: new Date(),
      song_info: {
        id: songs.id,
        name: songs.name,
        preview_url: songs.preview_url,
        album: songs.album,
        artists: songs.artists,
      },
    };

    return mutate(
      "/supabase/reads/UserPinned",
      setUserDataOnSupabase("UserPinned", songInfo),
      {
        optimisticData: [...pinnedSongs, songInfo],
        revalidate: true,
        rollbackOnError: true,
        populateCache: false,
      }
    );
  };

  const menuStyle = css`
    .szh-menu {
      background: #252525;
      color: aliceblue;
      user-select: none;
      box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      padding: 5px;
      font-size: 14px;

      &__item {
        padding: 5px 10px;
        &--hover {
          background-color: #1e1e1e;
        }
      }

      &__divider {
        background: #494949;
      }
      &__arrow {
        background: #252525;
      }
    }
  `;

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
          <Icon as={BsThreeDots} fontSize={dotsSize || "sm"}/>
        </MenuButton>
      }
      transition
    >
      <SubMenu overflow={"visible"} arrow={true} label="Add to playlist">
        <MenuItem onClick={() => handelCreatePlaylist(songs)}>
          Create new playlist
        </MenuItem>
        <MenuDivider />
        {userPlaylists?.map((playlists) => {
          return (
            <MenuItem onClick={() => handelAddToPlaylist(playlists)}>
              {playlists.title}
            </MenuItem>
          );
        })}
      </SubMenu>
      <MenuDivider />
      <MenuItem onClick={handelAddToPin}>Add to pin</MenuItem>
      <MenuItem>Save to your Liked song</MenuItem>
      <MenuItem>Go to artist</MenuItem>
      <MenuDivider />
      <MenuItem>Share</MenuItem>
    </Menu>
  );
};

export default DotsMenu;
