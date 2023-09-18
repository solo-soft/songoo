import {apolloClient} from "../../client/apolloClients";
import httpStatus from "http-status";

const fetcherQuery = async (query , variables : {}) => {

    const apollo = await apolloClient;


    try {
        const { data } = await apollo.client.query({
            query,
            variables
        });

        return data;
    }
    catch (e) {
        throw {
            code: 403,
            reason:  httpStatus[403],
            message:"Your client does not have permission in this location",
            status: 403,
        };
    };
};

export default fetcherQuery;
