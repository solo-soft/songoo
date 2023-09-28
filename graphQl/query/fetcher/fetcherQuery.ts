import { apolloClient } from "../../client/initializeClient";
import httpStatus from "http-status";

const fetcherQuery = async (query: any, variables?: {}) => {
  const {client , status} = await apolloClient

  if (status === 200) {
    const { data } = await client?.query({
      query,
      variables,
    });


    return data;
  }
  if (status === 500) {
    throw {
      reason: httpStatus[status],
      message: "Oops, something went wrong, please make sure you're connection, then refresh the page",
      status,
    };
  }
};

export default fetcherQuery;
