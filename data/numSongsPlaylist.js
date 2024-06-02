import prisma from "@/lib/prisma";
import getPlaylists from "./playlists";

export default async function getNumSongsPlaylist() {
  const num = [];
  const playlists = await getPlaylists();

  // Use Promise.all to await all async operations
  await Promise.all(playlists.map(async (playlist) => {
    const response = await prisma.playlistSong.findMany({
      where: { playlistId: playlist.id },
    //   select: { song: { select: { poster: true } } }, // Select only the 'poster' field from the related song
    });

    // If a matching poster is found, push it into the posters array
    if (response) {
      num.push(response.length);
    }
  }));
  return num;
}
