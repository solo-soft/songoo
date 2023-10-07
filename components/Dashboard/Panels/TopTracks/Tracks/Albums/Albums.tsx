import {Stack, Text} from "@chakra-ui/react";
import {Hide} from "@chakra-ui/react";
import Link from "next/link";
import {TAlbums, TSongs} from "../../../../../TMainData";

const Albums = ({album} : {album : Partial<TSongs["tracks"][0]> | undefined}) => {

    return (
        <Hide below={"sm"}>
            <Stack flex={3} position={"relative"}  rounded={8} overflow={"hidden"}>
                <Link href={`/album/${album?.id}`}>
                <Text as={"u"} cursor={"pointer"} noOfLines={1} fontSize={{sm : "2xs" , xl : "xs"}}
                      color={"white"}>{album?.name}</Text>
                </Link>
            </Stack>
        </Hide>
    );
};

export default Albums;
