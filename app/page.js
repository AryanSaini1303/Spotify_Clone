import Content from "@/components/content";
import getPlaylistPosters from "@/data/playlistPosters";
import getPlaylists from "@/data/playlists";

// Only a "page.js" file in the "app" folder component can be async not any other separate component for example all the components of the "components" folder
// We can't use getServerSideProps in a "page.js" file in the "app" folder
// Never add a 'use client' directive in a whole componenet, separate the part in a separate component which needs to be directed as client
export default async function HomePage() {
  const playlists= await getPlaylists();
  const playlistPosters = await getPlaylistPosters();
  // console.log(playlists);
  return (
    <>
      <Content playlists={playlists} playlistPosters={playlistPosters}/>
    </>
  );
}
