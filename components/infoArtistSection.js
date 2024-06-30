import styles from "./infoArtistSectoin.module.css";
export default function InfoArtistSection({ info }) {
  return (
    info && (
      <div className={styles.artistCard}>
        <img src={info.artistPoster} alt="" />
        <section className={styles.info}>
          <h4>{info.artist}</h4>
          <p>{info.artistDescription}</p>
          <h4 className={styles.header}>About the artist</h4>
          <div className={styles.shade}></div>
        </section>
      </div>
    )
  );
}
