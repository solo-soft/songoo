import _ from "lodash";
import { Icon, Tooltip, useTheme, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { dynamicIcons } from "./dynamicIcons";
import { IconType } from "react-icons";
import Home from "./Home/Home";
import Singers from "./Singers/Singers";

type TDynamicIcons = {
  name: string;
  icon: IconType;
  identity: string;
  direction: string;
};

const Direction = () => {
  const theme = useTheme();

  const {
    data: { user: session },
  } = useSWR("/api/getUserSession");

  const router = useRouter();

  const renderIcons: JSX.Element[] = dynamicIcons().map(
    ({ name, icon, identity, direction }: TDynamicIcons) => {
      const optionColors = _.get(theme, `icons.color.${[identity]}`);
      return (
        <Tooltip key={name} label={name} bg={optionColors}>
          <VStack
            onClick={() => router.push(direction)}
            display={session ? "flex" : "none"}
            pointerEvents={session ? "auto" : "none"}
            cursor={"pointer"}
            p={[2, 2, 1, 1.5, 2]}
            bg={"#252525"}
            rounded={5}
          >
            <Icon as={icon} fontSize={25} color={optionColors} />
          </VStack>
        </Tooltip>
      );
    }
  );

  return (
    <>
      {renderIcons}
      <Home />
      <Singers/>
    </>
  );
};

export default Direction;
