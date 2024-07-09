import { useState } from "react";
import styles from "./playlistSong.module.css";

export default function PlaylistSong({ song, index, getCurrentSongInfo, setCurrentSongId, currentSongId, playlistId }) {
  // console.log(playlistId);
  // console.log(localStorage.getItem('currentId')===playlistId);
  const [hover, setHover] = useState(false);
  currentSongId&&localStorage.setItem('currentSongId',currentSongId);
  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  function handleClick(id) {
    getCurrentSongInfo(song);
    setCurrentSongId(id);
  }

  let onClickStyle = {
    color: "#1FDF64"
  };

  return (
    <div
      className={styles.song}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(song.id)}
    >
      <header className={styles.firstInfo}>
        {hover && localStorage.getItem('currentSongId')!=song.id? (
          <img src="/playButton.svg" alt="" className={styles.playButton} />
        ) : (
          <h5 style={localStorage.getItem('currentSongId') === song.id&&localStorage.getItem('currentId')===playlistId ? onClickStyle : {}}>{index + 1}</h5>
        )}
      </header>
      <div className={styles.songCard}>
        <img src={song.poster} alt="" />
        <div className={styles.songDetails}>
          <h4 style={localStorage.getItem('currentSongId') === song.id&&localStorage.getItem('currentId')===playlistId ? onClickStyle : {}}>{song.title}</h4>
          <h5>{song.artist}</h5>
        </div>
      </div>
      <time>
        {Math.floor(song.duration / 60)}:{song.duration % 60}
      </time>
    </div>
  );
}
