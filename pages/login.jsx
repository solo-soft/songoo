import Login from "../components/Auth/Login/Login";
import { Button, Container, IconButton } from "@chakra-ui/react";
import Video from "../components/Auth/Video/Video";
import verifyToken from "../utils/verifyToken";
import { AiFillHome } from "react-icons/ai";
import HomeButton from "../components/Auth/Common/HomeButton";

const LoginPage = () => {
  return (
    <Container maxW={"full"} position={"relative"}>
      <Login />
      <Video />
        <HomeButton/>
    </Container>
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
