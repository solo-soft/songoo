import {Input, Stack} from "@chakra-ui/react";

const Search = () => {
    return (
        <Stack>
            <Input type={"text"}
                   variant={"unstyled"}
                   fontSize={"2xl"}
                   fontWeight={"bold"}
                   _placeholder={{fontSize : "2xl" , fontWeight : "normal"}}
                   placeholder={"Search here"}/>
        </Stack>
    );
};

export default Search;
