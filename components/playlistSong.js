import styles from "./playlistSong.module.css"
export default function PlaylistSong({song, index}) {
  return (
    <div className={styles.song} key={song.id}>
      <h5>{index + 1}</h5>
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
