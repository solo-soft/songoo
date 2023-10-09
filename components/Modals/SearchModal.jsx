import {Button, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import Header from "../Header/Options/Search/Searchbar/Header";


const SearchModal = ({renderSearch , handleSearch , isOpen , setInputSearch}) => {
    return (
        <Modal
            size={["full" , "full" , "full"  , "4xl"]}
            onClose={handleSearch}
            isOpen={isOpen}
            isCentered
        >
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg={"#181616"} >
                <ModalHeader>
                    <HStack>
                        <Header setInputSearch={setInputSearch} />
                        <Button
                            size={"xs"}
                            onClick={handleSearch}
                        >
                            Close
                        </Button>
                    </HStack>
                </ModalHeader>

                <ModalBody>
                    {renderSearch}
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};

export default SearchModal;
