import prisma from "@/lib/prisma";
import getPlaylists from "@/data/playlists";
import NodeCache from "node-cache";

// const cache=new NodeCache({stdTTL:600}) // 600 seconds i.e. 10 minutes
const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
// cache will forever be there

export default async function getNumSongsPlaylist(req, res) {
  const cachedData = cache.get("numSongsPlaylist");
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  const playlists = await getPlaylists();
  let num = await Promise.all(
    playlists.map(async (playlist) => {
      const count = await prisma.playlist.findFirst({
        where: { id: playlist.id },
        select: { numOfSongs: true },
      });
      return count;
    })
  );
  num = num.map((obj) => obj.numOfSongs);
  cache.set("numSongsPlaylist", num);
  res.status(200).json(num);
}
