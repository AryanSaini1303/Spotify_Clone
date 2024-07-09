import prisma from "@/lib/prisma";
import NodeCache from "node-cache";

// const cache=new NodeCache({stdTTL:600}) // 600 seconds i.e. 10 minutes
const cache=new NodeCache() // cache will forever be there

export default async function getPlaylists(req,res) {
  const cachedData=cache.get('playlists');
  if(cachedData){
    res.status(200).json(cachedData);
  }
  try {
    const playlists = await prisma.playlist.findMany({
      select:{
        id:true,
        name:true,
        accentColor:true
      }
    });
    cache.set('playlists',playlists);
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Internal Server Error :(" });
  }
}
