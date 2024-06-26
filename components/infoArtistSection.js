import styles from "./infoArtistSectoin.module.css";
export default function InfoArtistSection() {
  return (
    <div className={styles.artistCard}>
      <img src="/demoArtsitImage.jpg" alt="" />
      <section className={styles.info}>
        <h4>Eli Wilson</h4>
        <p>
          With over 20 years as a full-time goaltending coach, Eli is known
          worldwide as one of the leading minds in goaltending coaching and
          development. His no nonsense approach to coaching has resonated
          worldwide across the goaltending community. He has worked with over 30
          goaltenders in the NHL, many of them since their minor hockey days.
        </p>
        <h4 className={styles.header}>About the artist</h4>
        <div className={styles.shade}></div>
      </section>
    </div>
  );
}
