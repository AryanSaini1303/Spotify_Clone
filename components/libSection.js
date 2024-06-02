import LibPlaylistSection from "./libPlaylistSection";
import LibSectionHeading from "./libSectionHeading";

export default function LibSection({ className, onClick, minimize, playlists, playlistPosters, num }) {
  return (
    <>
      <div className={className} style={{overflow:"auto"}}>
        <LibSectionHeading onClick={onClick} minimize={minimize}/>
        <LibPlaylistSection minimize={minimize} playlists={playlists} playlistPosters={playlistPosters} num={num}/>
      </div>
    </>
  );
}
