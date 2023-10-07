import {AbsoluteCenter, Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

const NetworkAlert = () => {
    return (
        <AbsoluteCenter>
            <Alert
                status="error"
                variant="top-accent"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height={240}
                rounded={15}
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize={["md", "md", "xl"]}>
                    Network error
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                    Your connection to the network is interrupted. Please check your
                    connection
                </AlertDescription>
            </Alert>
        </AbsoluteCenter>
    );
};

export default NetworkAlert;
