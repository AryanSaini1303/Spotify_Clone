import styles from "./playlistSongsSection.module.css";
import PlaylistNavs from "./playlistNavs";
import PlaylistSong from "./playlistSong";

export default function PlaylistSongsSection({currPlayInfo}) {
  return (
    <section className={styles.container}>
      <PlaylistNavs />
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
              <PlaylistSong song={song} index={index} key={song.id}/>
            );
          }))}
        </div>
      </section>
    </section>
  );
}
