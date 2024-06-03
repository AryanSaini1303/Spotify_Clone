import styles from "./playlistSection.module.css";
export default function PlaylistSection({ className, currPlayInfo }) {
  let totalSongsDuration=0;
  currPlayInfo.songInfo.map((song=>{
    totalSongsDuration+=song.duration;
  }))
  // totalSongsDuration=3661;
  // console.log(totalSongsDuration);
  return (
    <div className={className}>
      <div className={styles.shade} style={{background:`linear-gradient(${currPlayInfo.color},#121212)`}}></div>
      <header className={styles.headerSection}>
        <img
          src={currPlayInfo.poster}
          alt=""
        />
        <div className={styles.playlistInfo}>
          <h5>Playlist</h5>
          <h1>{currPlayInfo.name}</h1>
          <h5>{currPlayInfo.songInfo.length} songs, 
          {(Math.round(Math.floor(totalSongsDuration/3600)!=0)?(<span> {Math.round(Math.floor(totalSongsDuration/3600))} hr</span>):null)} 
          <span> {Math.round(Math.floor(totalSongsDuration%3600)/60)} min</span></h5>
        </div>
      </header>
    </div>
  );
}
