import prisma from "@/lib/prisma";

export default async function getPlaylists(req,res) {
  try {
    // Connect to the database
    await prisma.$connect();
    // Fetch playlists from the database
    const playlists = await prisma.playlist.findMany();
    // console.log(playlists);
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Internal Server Error :(" });
  }
}
