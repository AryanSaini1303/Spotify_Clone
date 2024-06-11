import styles from "./infoArtistSectoin.module.css";
export default function InfoArtistSection() {
  return (
    <div className={styles.artistCard}>
      <img src="/demoArtsitImage.jpg" alt="" />
      <section className={styles.info}>
        <h4>Eli Wilson</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam animi
          labore quisquam, natus atque aperiam rerum illum repudiandae nemo
          debitis quaerat blanditiis ea, odio at culpa molestiae asperiores
          sequi cumque harum itaque doloremque. Cumque dignissimos ad aut
          ducimus temporibus voluptate nam nemo, nostrum impedit nihil.
        </p>
        <h4 className={styles.header}>About the artist</h4>
        <div className={styles.shade}></div>
      </section>
    </div>
  );
}
