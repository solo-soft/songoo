import {Box, Container} from "@chakra-ui/react";
import Video from "../components/Auth/Video/Video";
import Signup from "../components/Auth/Signup/Signup";
import verifyToken from "../utils/verifyToken";
import HomeButton from "../components/Auth/Common/HomeButton";

const SignupPage = () => {
  return (
    <>
      <title>Signup</title>
      <Box>
        <Signup />
        <Video />
        <HomeButton />
      </Box>
    </>
  );
};

export default SignupPage;

export const getServerSideProps = async ({ res, req }) => {
  const session = verifyToken(req);

  if (session?.user) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
};
