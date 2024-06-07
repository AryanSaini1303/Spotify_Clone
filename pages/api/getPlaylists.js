import prisma from "@/lib/prisma";

export default async function getPlaylists(req,res) {
  try {
    const playlists = await prisma.playlist.findMany({
      select:{
        id:true,
        name:true,
        accentColor:true
      }
    });
    // console.log(playlists);
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Internal Server Error :(" });
  }
}
