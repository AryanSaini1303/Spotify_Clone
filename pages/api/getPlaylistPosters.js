import prisma from "@/lib/prisma";
import getPlaylists from "@/data/playlists";

export default async function getPlaylistPosters(req,res) {
  const posters = [];
  const playlists = await getPlaylists();

  // Use Promise.all to await all async operations
  // await Promise.all(playlists.map(async (playlist) => {
  //   const response = await prisma.playlistSong.findFirst({
  //     where: { playlistId: playlist.id },
  //     select: { song: { select: { poster: true } } }, // Select only the 'poster' field from the related song
  //   });
  //   // If a matching poster is found, push it into the posters array
  //   if (response) {
  //     posters.push(response.song.poster);
  //   }
  // }));
  // using above method was fine but resulted in changing the order of response every once in a while so i used for loop
  
  for (let i = 0; i < playlists.length; i++) {
    const response = await prisma.playlistSong.findFirst({
      where: { playlistId: playlists[i].id },
      select:{poster:true}, // Select only the 'poster' field from the related song
    });
    // console.log(response);
    if (response) {
      posters.push(response.poster);
    }
  }

  res.status(200).json(posters);
}