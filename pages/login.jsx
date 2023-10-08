import Login from "../components/Auth/Login/Login";
import {Box, Button, Container, IconButton} from "@chakra-ui/react";
import Video from "../components/Auth/Video/Video";
import verifyToken from "../utils/verifyToken";
import HomeButton from "../components/Auth/Common/HomeButton";

const LoginPage = () => {

  return (
      <>
          <title>Login</title>
          <Box>
              <Login />
              <Video />
              <HomeButton />
          </Box>
      </>
  );
};

export default LoginPage;

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
