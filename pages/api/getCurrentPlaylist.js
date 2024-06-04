import prisma from "@/lib/prisma";

export default async function getCurrentPlaylist(req, res) {
  const Id = req.query.id;
  let currentPlaylistInfo = {
    name: "",
    color: "",
    songIds: "",
    poster: "",
    songInfo: "",
  };
  const currentPlaylist = await prisma.playlist.findFirst({
    where: { id: Id },
  });
  let response = await prisma.playlistSong.findMany({
    where: { playlistId: Id },
  });
  const response1 = await prisma.playlistSong.findFirst({
    where: { playlistId: Id },
  });
  const songIds = response.map((item) => ({ songId: item.songId }));
  let songInfo = [];
  await Promise.all(
    songIds.map(async (songId) => {
      // console.log(songId);
      response = await prisma.song.findFirst({
        where: { id: songId.songId },
      });
      songInfo.push(response);
    })
  );
  currentPlaylistInfo.name = currentPlaylist.name;
  currentPlaylistInfo.color = currentPlaylist.accentColor;
  currentPlaylistInfo.songIds = songIds;
  currentPlaylistInfo.poster = response1.poster;
  currentPlaylistInfo.songInfo = songInfo;
  res.json(currentPlaylistInfo);
  res.status(200).json(currentPlaylistInfo);
}
