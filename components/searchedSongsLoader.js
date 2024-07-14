import styles from "./searchedSongsLoader.module.css"
export default function SearchedSongsLoader() {
  return (
    <div className={styles.container}>
      <section className={`${styles.topSong} ${styles.background}`}>
        <div className={styles.mover}>
            <div className={styles.leftMover}></div>
        <div className={styles.rightMover}></div>
        </div>
      </section>
      <section className={styles.otherSongs}>
        <div className={`${styles.song} ${styles.background}`}>
            <div className={styles.mover}>
                <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
            </div>
        </div>
        <div className={`${styles.song} ${styles.background}`}>
            <div className={styles.mover}>
                <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
            </div>
        </div>
        <div className={`${styles.song} ${styles.background}`}>
            <div className={styles.mover}>
                <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
            </div>
        </div>
        <div className={`${styles.song} ${styles.background}`}>
            <div className={styles.mover}>
                <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
            </div>
        </div>
        <div className={`${styles.song} ${styles.background}`}>
            <div className={styles.mover}>
                <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
            </div>
        </div>
      </section>
    </div>
  );
}
