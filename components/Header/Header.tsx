import {Stack} from "@chakra-ui/react";
import { User } from "./User/User";
import Options from "./Options/Options";
import Greeting from "./Options/Search/Searchbar/Greeting";


const Header = ({
  position = "relative",
}: {
  position: string | string[] | any;
}) => {

  return (
    <Stack
      direction={["column", "column" , "column" , "row", "row"]}
      position={position}
      w={"full"}
      justify={"space-between"}
      py={[5 , 5 , 3 , 5]}
    >
      <Greeting/>
      <Options/>
      <User />
    </Stack>
  );
};

export default Header;
