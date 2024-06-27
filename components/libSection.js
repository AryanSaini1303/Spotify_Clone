import LibPlaylistSection from "./libPlaylistSection";
import LibSectionHeading from "./libSectionHeading";

export default function LibSection({ className, onClick, minimize,playlistPosters, sendPlaylistIdToParent}) {
  return (
    <>
      <div className={className} style={{overflow:"auto"}}>
        <LibSectionHeading onClick={onClick} minimize={minimize}/>
        <LibPlaylistSection minimize={minimize} playlistPosters={playlistPosters} sendPlaylistIdToParent={sendPlaylistIdToParent}/>
      </div>
    </>
  );
}
