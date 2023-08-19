import React from 'react';
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";

const Error = () => {

    const router = useRouter();

    return (
        <div>
            <Button onClick={() => router.push("/")}>Refresh</Button>
        </div>
    );
};

export default Error;
