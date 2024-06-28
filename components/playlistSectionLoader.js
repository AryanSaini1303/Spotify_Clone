import styles from "./playlistSectionLoader.module.css";
export default function PlaylistSectionLoader() {
  return (
    <div className={styles.container}>
      <header className={styles.heading}>
        <div className={`${styles.image} ${styles.background}`}>
          <div className={styles.mover}>
            <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
          </div>
        </div>
        <div className={styles.playlistInfo}>
          <div className={`${styles.playlist} ${styles.background}`}>
            <div className={styles.mover}>
              <div className={styles.leftMover}></div>
              <div className={styles.rightMover}></div>
            </div>
          </div>
          <div className={`${styles.playlistName} ${styles.background}`}>
            <div className={styles.mover}>
              <div className={styles.leftMover}></div>
              <div className={styles.rightMover}></div>
            </div>
          </div>
          <div className={`${styles.details} ${styles.background}`}>
            <div className={styles.mover}>
              <div className={styles.leftMover}></div>
              <div className={styles.rightMover}></div>
            </div>
          </div>
        </div>
      </header>
      <section className={styles.contentSection}>
        {/* <div className={`${styles.navs} ${styles.background}`}></div>
                <div className={`${styles.heading} ${styles.background}`}></div> */}
        <div className={`${styles.songs} ${styles.background}`}>
          <div className={styles.mover}>
            <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
          </div>
        </div>
        <div className={`${styles.songs} ${styles.background}`}>
          <div className={styles.mover}>
            <div className={styles.leftMover}></div>
            <div className={styles.rightMover}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
