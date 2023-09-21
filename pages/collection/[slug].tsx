import { SWRConfig } from "swr";
import ReceLike from "../../components/Collection/ReceLike/ReceLike";
import verifyToken from "../../utils/verifyToken";
import CollectionProvider from "../../provider/CollectionProvider/CollectionProvider";
import PinnedProvider from "../../provider/PinnedProvider";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";
import Header from "../../components/Collection/Common/Header/Header";
import { NextApiRequest, NextApiResponse } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

const Slug = ({ fallback }: { fallback: {} }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CollectionProvider>
        <PinnedProvider>
          <Header />
          <ReceLike />
          <CreatePlaylist />
        </PinnedProvider>
      </CollectionProvider>
    </SWRConfig>
  );
};
export default Slug;

export const getServerSideProps = async ({
  req,
  res,
  query: { slug },
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: NextParsedUrlQuery;
}) => {
  const session = verifyToken(req);

  if (!session?.user) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }

  console.log(slug);

  if (slug !== "likes" && slug !== "recently-played") {
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
