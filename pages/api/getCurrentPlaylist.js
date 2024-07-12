import prisma from "@/lib/prisma";
import NodeCache from "node-cache";

// const cache=new NodeCache({stdTTL:600}) // 600 seconds i.e. 10 minutes
const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
// cache will forever be there

export default async function getCurrentPlaylist(req, res) {
  const Id = req.query.id;
  const cachedPlaylist = cache.get(Id);
  if (cachedPlaylist) {
    return res.status(200).json(cachedPlaylist);
  }
  try {
    let currentPlaylistInfo = {};
    const currentPlaylist = await prisma.playlist.findFirst({
      where: { id: Id },
      select: {
        name: true,
        accentColor: true,
      },
    });
    let songIds = await prisma.playlistSong.findMany({
      where: { playlistId: Id },
      select: {
        songId: true,
      },
    });
    const response1 = await prisma.playlistSong.findFirst({
      where: { playlistId: Id },
      select: {
        poster: true,
      },
    });
    let songInfo = [];
    await Promise.all(
      songIds.map(async (songId) => {
        let response = await prisma.song.findFirst({
          where: { id: songId.songId },
        });
        let response1 = await prisma.playlistSong.findMany({
          where: { songId: songId.songId },
          select: {
            playlistId: true,
          },
        });
        response.playlistIds = response1;
        songInfo.push(response);
      })
    );
    currentPlaylistInfo.name = currentPlaylist.name;
    currentPlaylistInfo.color = currentPlaylist.accentColor;
    currentPlaylistInfo.songIds = songIds;
    currentPlaylistInfo.poster = response1.poster;
    currentPlaylistInfo.songInfo = songInfo;
    currentPlaylistInfo.id = Id;
    cache.set(Id, currentPlaylistInfo);
    res.status(200).json(currentPlaylistInfo);
  } catch (error) {
    console.error("Error fetcing playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
