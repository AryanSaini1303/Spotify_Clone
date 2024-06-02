import prisma from "@/lib/prisma"

export default async function getPlaylists() {
    try {
      // Connect to the database
      await prisma.$connect();
      // Fetch playlists from the database
      const playlists = await prisma.playlist.findMany();
  
      // Log playlists
    //   console.log("Playlists:", playlists);
      return playlists;
    } catch (error) {
      console.error("Error fetching playlists:", error);}
  }