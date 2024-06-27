import { useState } from "react";
import styles from "./playlistSong.module.css";
export default function PlaylistSong({ song, index, key }) {
  const [hover, setHover] = useState(false);
  function handleMouseEnter() {
    setHover(true);
  }
  function handleMouseLeave() {
    setHover(false);
  }
  return (
    <div
      className={styles.song}
      key={key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header className={styles.firstInfo}>
        {hover ? (
          <img src="/playButton.svg" alt="" className={styles.playButton} />
        ) : (
          <h5>{index + 1}</h5>
        )}
      </header>
      <div className={styles.songCard}>
        <img src={song.poster} alt="" />
        <div className={styles.songDetails}>
          <h4>{song.title}</h4>
          <h5>{song.artist}</h5>
        </div>
      </div>
      <time>
        {Math.floor(song.duration / 60)}:{song.duration % 60}
      </time>
    </div>
  );
}
