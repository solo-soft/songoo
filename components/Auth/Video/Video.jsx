import { AbsoluteCenter, Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {useRouter} from "next/router";

const Video = () => {
    const router = useRouter()

  return (
    <AbsoluteCenter w={"full"} h={"100vh"} zIndex={1000}>
      <motion.div
          initial={{opacity : 0}}
          animate={{opacity : "30%"}}
          transition={{ duration: 0.5 }}>
        <video
          style={{
            objectFit: "cover",
            height: "100vh",
            width : "100%"
          }}
          src={router.pathname === "/signup" ? "/dance2.mp4" : "/dance3.mp4"}
          loop
          muted
          autoPlay
          controls={false}
          playsInline={true}
        />
      </motion.div>
    </AbsoluteCenter>
  );
};

export default Video;
