import {Icon, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {RiSearchLine} from "react-icons/ri";

const Header = ({setInputSearch}) => {
    const handleInputChange = e => setInputSearch(e.target.value)
    return (
            <InputGroup>
                <Input
                    variant={"filled"}
                    size={"sm"}
                    type="text"
                    focusBorderColor="transparent"
                    placeholder="Search..."
                    onChange={handleInputChange}
                />
            </InputGroup>
    );
};

export default Header;
