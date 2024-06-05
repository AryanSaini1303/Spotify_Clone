import styles from "./playlistSongsSection.module.css";
import PlaylistNavs from "./playlistNavs";
import { useState } from "react";

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
              <div className={styles.song}>
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
          }))}
        </div>
      </section>
    </section>
  );
}
