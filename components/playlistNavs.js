import { useState } from "react";
import styles from "./playlistNavs.module.css";
export default function PlaylistNavs() {
  return (
    <section className={styles.container}>
      <div className={styles.playnshuffle}>
        <div className={styles.playButton}>
          <img src="/playButton.svg" alt="" />
        </div>
        <div className={styles.shuffleButton}>
          <img src="/shuffle.svg" alt="" />
        </div>
      </div>
      <div className={styles.search}>
        <img src="/search.svg" alt="" />
      </div>
    </section>
  );
}
