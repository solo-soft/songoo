import verifyToken from "../../utils/verifyToken";
import getAlbumsInfoById from "../../graphQl/query/schema/getAlbumsInfoById";
import Album from "../../components/Album/Album";
import RecentlyProvider from "../../provider/RecentlyProvider";
import PinnedProvider from "../../provider/PinnedProvider";
import {SWRConfig} from "swr";


const Slug = ({fallback}) => {
  return (
      <SWRConfig value={{fallback}}>
        <RecentlyProvider>
          <PinnedProvider>
            <Album/>
          </PinnedProvider>
        </RecentlyProvider>
      </SWRConfig>

  )
};

export default Slug;

export const getServerSideProps = async ({
  req,
  res,
  params,
}) => {


  const session = verifyToken(req);
  const albumsInfo = await getAlbumsInfoById(params.slug)


  return {
    props: {
      fallback: {
        "/api/getUserSession": session,
        "query/schema/getAlbumsInfoById" : albumsInfo
      },
    },
  };
};
