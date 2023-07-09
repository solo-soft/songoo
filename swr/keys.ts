import getArtistInfoById from "../graphQl/query/schema/getArtistInfoById";

export const suggestionKey = (artistIdChoose) => ["query", "/query/artists/getArtist" , artistIdChoose]

export const suggestionFetcher = async ([key, url , artistIdChoose]) => getArtistInfoById(artistIdChoose)
