import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const RouteButton = ({ title }) => {
  const router = useRouter();

  return (
    <div>
      <Button
        size={["xs", "sm"]}
        onClick={() => router.push(`/${title.toLowerCase()}`)}
        colorScheme={"gray"}
        variant="solid"
      >
        {title}
      </Button>
    </div>
  );
};

export default RouteButton;
