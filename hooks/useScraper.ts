export const useScraper = () => {
  return {
    spotifyScraper: async (id: string) => {
      const url = `https://spotify-downloader-api.p.rapidapi.com/Home/Download?Tracklink=https://open.spotify.com/track/${id}?si=dae3f80f86934437`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "269926aecemsh263311c0955020ep18fd21jsnd518d7a7071a",
          "X-RapidAPI-Host": "spotify-downloader-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
      }
    },
  };
};
