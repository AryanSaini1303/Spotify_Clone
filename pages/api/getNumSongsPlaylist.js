import prisma from "@/lib/prisma";
import getPlaylists from "@/data/playlists";

export default async function getNumSongsPlaylist(req,res) {
  const num = [];
  const playlists = await getPlaylists();

  // Use Promise.all to await all async operations
  await Promise.all(playlists.map(async (playlist) => {
    const response = await prisma.playlistSong.findMany({
      where: { playlistId: playlist.id },
      select:{songId:true}
    });

    // If a matching poster is found, push it into the posters array
    if (response) {
      num.push(response.length);
    }
  }));
  res.status(200).json(num);
}
