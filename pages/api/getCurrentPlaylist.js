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
    let songInfo = await prisma.$queryRaw`
        SELECT * FROM "songs" WHERE "playlistIds" @> ${JSON.stringify([
          Id,
        ])}::jsonb
      `;
    currentPlaylistInfo.name = currentPlaylist.name;
    currentPlaylistInfo.color = currentPlaylist.accentColor;
    currentPlaylistInfo.poster = songInfo[0].poster;
    currentPlaylistInfo.songInfo = songInfo;
    currentPlaylistInfo.id = Id;
    cache.set(Id, currentPlaylistInfo);
    res.status(200).json(currentPlaylistInfo);
  } catch (error) {
    console.error("Error fetcing playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
