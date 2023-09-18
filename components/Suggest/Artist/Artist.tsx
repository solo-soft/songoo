import { Stack } from "@chakra-ui/react";
import Images from "./Images/Images";
import Name from "./Name/Name";
import Selection from "./Selection/Selection";
import { TArtist } from "../../TMainData";

export default function Artist({ artist }: { artist: TArtist | undefined}) {
  const props = { artist };
  return (
    <Stack order={[1, 1 , 1, 2]} h={["auto", "auto" , "auto" , "full"]}>
      <Selection />
      <Name {...props} />
      <Images {...props} />
    </Stack>
  );
}
