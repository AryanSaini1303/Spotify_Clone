import styles from "./playlistNavs.module.css";
import { useEffect, useState } from "react";
export default function PlaylistNavs({
  id,
  currentId,
  play,
  getPauseFromPlaylistNavs,
}) {
  const [currentFlag, setCurrentFlag] = useState(false);
  currentId && !localStorage.getItem("playSearchedSongId")&&localStorage.setItem("currentId", currentId);
  useEffect(() => {
    id === localStorage.getItem("currentId") && setCurrentFlag(true);
  }, [localStorage.getItem("currentId"), play]);
  function handleClick() {
    if (localStorage.getItem("currentId") === id) {
      if (play) {
        getPauseFromPlaylistNavs(true);
      }
      else{
        getPauseFromPlaylistNavs(false);
      }
    }
  }
  return (
    <section className={styles.container}>
      <div className={styles.playnshuffle}>
        <div className={styles.playButton} onClick={handleClick}>
          <img
            src={currentFlag && play ? "/pause.svg" : "/playButton.svg"}
            alt="Play/Pause"
            style={currentFlag && play ? null : { marginLeft: "3px" }}
          />
        </div>
        <div className={styles.shuffleButton}>
          <img src="/shuffle.svg" alt="Shuffle" />
        </div>
      </div>
      <div className={styles.search}>
        <img src="/search.svg" alt="Search" />
      </div>
    </section>
  );
}
