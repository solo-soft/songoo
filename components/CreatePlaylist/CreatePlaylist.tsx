import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { BiSolidEdit } from "react-icons/bi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IS_OPEN_MODAL_CREATE_PLAYLIST } from "../../recoil/atoms/atoms";
import { SELECTED_THE_SONG_BY_USER } from "../../recoil/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import setUserDataOnSupabase from "../../supabase/inserts/setUserDataOnSupabase";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { TSession } from "../Type";
import { mutate } from "swr";
import { TUserPlaylists } from "../Dashboard/Type";
import getUserDataOnSupabase from "../../supabase/reads/getUserDataOnSupabase";
import {toast} from "react-toastify";

const CreatePlaylist = () => {
  //*Ref of input type file
  const inputRef = useRef();

  const { data: session }: { data: TSession | undefined } = useSWR(
    "/api/getUserSession"
  );

  const {
    data: userPlaylists,
  } : {
    data: Array<TUserPlaylists> | undefined ;
  } = useSWR("/supabase/reads/UserPlaylists", () =>
    getUserDataOnSupabase("UserPlaylists", session)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useRecoilState(
    IS_OPEN_MODAL_CREATE_PLAYLIST
  );
  const selectedTheSongByUser = useRecoilValue(SELECTED_THE_SONG_BY_USER);

  const handelUploadImage = (e) => {
    const selectedFile = e.target.files[0];
    setUploadImage(selectedFile);
  };

  const handelUploadNewPlaylist = async () => {
    const newPlaylist = {
      id: uuidv4(),
      userId: session?.user.id,
      create_by: session?.user.email,
      title,
      description,
      image_uploaded: null,
      song_info: [selectedTheSongByUser],
      created_at: new Date(),
    };
    try {
      mutate(
          "/supabase/reads/UserPlaylists",
          setUserDataOnSupabase("UserPlaylists", newPlaylist),
          {
            optimisticData: userPlaylists && [...userPlaylists , newPlaylist],
            populateCache : false,
            revalidate: true,
            rollbackOnError: true,
          }
      );
      toast.success("The playlist was created successfully")
      setIsOpenModal(false);
      setUploadImage(null);
    }
    catch (e) {
      toast.error("Something went wrong in create playlist")
    }
  };

  return (
    <Modal
      size={"xl"}
      isCentered={true}
      isOpen={isOpenModal}
      onClose={() => setIsOpenModal((prevState) => !prevState)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={"#252525"}>
          <Text w={"full"} textAlign={"center"}>
            Create own playlist
          </Text>
        </ModalHeader>

        <ModalBody bg={"#252525"}>
          <HStack>
            <VStack flex={1}>
              <Box
                w={210}
                h={210}
                rounded={10}
                position={"relative"}
                overflow={"hidden"}
              >
                <Image
                  src={selectedTheSongByUser?.album?.images[0].url}
                  layout={"fill"}
                  objectFit={"cover"}
                />

                <HStack
                  w={"full"}
                  justify={"center"}
                  position={"absolute"}
                  bottom={0}
                  p={2}
                  bg={"blackAlpha.800"}
                >
                  <Button
                    onClick={() => inputRef.current.click()}
                    size={"sm"}
                    leftIcon={<Icon as={BiSolidEdit} />}
                  >
                    Edit
                  </Button>
                  <Input
                    ref={inputRef}
                    style={{ display: "none" }}
                    type={"file"}
                    accept={"image/*"}
                    onChange={handelUploadImage}
                  />
                </HStack>
              </Box>
            </VStack>

            <VStack flex={1}>
              <HStack w={"full"} justify={"space-between"}>
                <HStack fontSize={"sm"} fontWeight={"bold"}>
                  <Text>Add to pin</Text>
                  <Switch colorScheme={"purple"} size="sm" />
                </HStack>
                <Menu>
                  <MenuButton
                    fontSize={"sm"}
                    rounded={5}
                    bg={"#181616"}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Symbols
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              <Input
                value={title}
                w={"full"}
                bg={"#181616"}
                border={"none"}
                type={"text"}
                placeholder={"Add a name"}
                fontSize={"sm"}
                _placeholder={{ fontSize: "sm" }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                resize={"none"}
                bg={"#181616"}
                border={"none"}
                placeholder={"Add an optional description (optional)"}
                fontSize={"sm"}
                _placeholder={{ fontSize: "sm" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </VStack>
          </HStack>
        </ModalBody>

        <ModalFooter bg={"#252525"}>
          <Button
            size={"sm"}
            variant={"ghost"}
            colorScheme={"purple"}
            mr={3}
            onClick={() => setIsOpenModal((prevState) => !prevState)}
          >
            Close
          </Button>
          <Button
            onClick={handelUploadNewPlaylist}
            size={"sm"}
            colorScheme="gray"
            mr={3}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePlaylist;
