import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ActionButton = ({ handleSubmit, status, title }) => {
  return (
    <motion.div
      whileHover="hover"
      whileTap="hover"
      variants={{
        hover: {
          scale: 1.1,
          rotate: [0, -5, 5, -5, 5, 0], // Adds a shake effect
          transition: {
            duration: 0.3,
            repeat: 1, // Number of times the shake animation will repeat
            repeatType: "reverse", // Reverses the animation on each repeat
            ease: [0.9, 0.05, 0.9, 0.95],
          },
        },
      }}
    >
      <Button
        size={["xs" , "sm"]}
        isLoading={status}
        onClick={handleSubmit}
        colorScheme={"red"}
        variant="solid"
      >
        {title}
      </Button>
    </motion.div>
  );
};

export default ActionButton;
