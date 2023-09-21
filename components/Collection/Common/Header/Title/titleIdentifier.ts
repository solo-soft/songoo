export const titleIdentifier = (
  property: string | undefined
): string | null => {
  switch (property) {
    case "likes":
      return "Your Liked Songs";
    case "recently":
      return "Your Recently Played";
    case "playlists":
      return "Your Playlists";
    default:
      return null;
  }
};
