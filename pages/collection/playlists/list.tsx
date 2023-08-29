import CollectionProvider from "../../../provider/CollectionProvider";
import Collection from "../../../components/Collection/Collection";
import verifyToken from "../../../utils/verifyToken";
import {SWRConfig} from "swr";

const List = ({fallback}) => {
    return (

        <SWRConfig value={{fallback}}>
            <CollectionProvider>
                <Collection/>
            </CollectionProvider>
        </SWRConfig>
    );
};

export default List;


export const getServerSideProps = async ({ req, res}) => {

    const session = verifyToken(req);

    if (!session?.user) {
        res.writeHead(302, { Location: "/" });
        res.end();
        return { props: {} };
    }

    return {
        props: {
            fallback: {
                "/api/getUserSession": session,
            },
        },
    };
};
