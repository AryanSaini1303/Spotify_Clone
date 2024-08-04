import styles from "./playlistNavs.module.css";
import { useEffect, useState } from "react";
export default function PlaylistNavs({
  id,
  currentId,
  play,
  getPauseFromPlaylistNavs,
  currSongsInfo,
  getCurrSongsInfo,
  queueFlag,
  setQueueSongNum
}) {
  const [currentFlag, setCurrentFlag] = useState(false);
  currentId &&
    !localStorage.getItem("playSearchedSongId") &&
    localStorage.setItem("currentId", currentId);
  useEffect(() => {
    id === localStorage.getItem("currentId") && setCurrentFlag(true);
  }, [localStorage.getItem("currentId"), play]);
  function handleClick() {
    console.log(localStorage.getItem("currentId"));
    console.log(id);
    console.log(queueFlag);
    console.log(currentId);
    localStorage.removeItem("playSearchedSongId");
    if (localStorage.getItem("currentId") === id) {
      console.log("here");
      if (queueFlag == "false" || !queueFlag) {
        if (play) {
          getPauseFromPlaylistNavs(true);
        } else {
          getPauseFromPlaylistNavs(false);
        }
      } else if (queueFlag || queueFlag == "true") {
        if (!currentId) {
          // here if the currentId is not defined then this means that it is the first render of the playlist and no song is clicked as currentId is only set when any song of a playlist is clicked or when then queueSongs are first sent to the parent component, so we can deduce that if currentId is not defined then it is the first render and we have to send the queuesongs to the parent again instead of playing the current song selected.
          getCurrSongsInfo(currSongsInfo);
          console.log("here");
          setQueueSongNum(parseInt(localStorage.getItem("queueSongNum")));
        } else {
          if (play) {
            getPauseFromPlaylistNavs(true);
          } else {
            getPauseFromPlaylistNavs(false);
          }
        }
      }
    } else if (localStorage.getItem("currentId") != id) {
      console.log("here");
      setQueueSongNum(0);
      getCurrSongsInfo(currSongsInfo);
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
