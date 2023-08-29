import { SWRConfig } from "swr";
import Collection from "../../components/Collection/Collection";
import verifyToken from "../../utils/verifyToken";
import CollectionProvider from "../../provider/CollectionProvider";
import PinnedProvider from "../../provider/PinnedProvider";

const Slug = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CollectionProvider>
        <PinnedProvider>
          <Collection />
        </PinnedProvider>
      </CollectionProvider>
    </SWRConfig>
  );
};
export default Slug;

export const getServerSideProps = async ({ req, res , query : {slug} }) => {
  const session = verifyToken(req);

  if (!session?.user) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }

  console.log(slug)

  if (slug !== 'likes' && slug !== 'recently-played') {
    return {
      notFound: true,
    };
  }


  return {
    props: {
      fallback: {
        "/api/getUserSession": session,
      },
    },
  };
};
