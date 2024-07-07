import styles from "./playlistSongsSection.module.css";
import PlaylistNavs from "./playlistNavs";
import PlaylistSong from "./playlistSong";
import { useEffect, useState } from "react";

export default function PlaylistSongsSection({ currPlayInfo, getCurrentSongInfo, playerPlay, playerPlaylistId }) {
  const [currentSongId, setCurrentSongId] = useState(null);
  const [finalPlay,setFinalPlay]=useState(false);
  // This state should only be in the parent component i.e. PlaylistSongsSection not in the child component i.e. PlaylistSong as each child component maintains its own state and does not know about the state of other child components. 
  useEffect(()=>{
    if(playerPlay){
      setFinalPlay(true);
    }
    else{
      setFinalPlay(false);
    }
  },[playerPlay])
  return (
    <section className={styles.container}>
      <PlaylistNavs id={currPlayInfo.id} currentId={playerPlaylistId} play={finalPlay}/>
      <section className={styles.songsSection}>
        <header className={styles.info}>
          <h5>#</h5>
          <h5>Title</h5>
          <h5>
            <img src="/clock.svg" alt="" />
          </h5>
        </header>
        <hr />
        <div className={styles.songs}>
          {currPlayInfo.length!=0&&(currPlayInfo.songInfo.map((song, index) => {
            return (
              <PlaylistSong song={song} index={index} getCurrentSongInfo={getCurrentSongInfo} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId}/>
            );
          }))}
        </div>
      </section>
    </section>
  );
}
