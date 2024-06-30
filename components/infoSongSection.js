import styles from "./infoSongSection.module.css";
export default function InfoSongSection({ info }) {
  return (
    info && (
      <div className={styles.songCard}>
        <img src={info.poster} alt="" />
        <div className={styles.songInfo}>
          <h2>{info.title}</h2>
          <h5>{info.artist}</h5>
        </div>
      </div>
    )
  );
}
