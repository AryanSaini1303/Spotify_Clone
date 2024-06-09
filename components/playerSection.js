import styles from "./playerSection.module.css"
export default function PlayerSection({ className }) {
  return (
    <>
      <section className={className}>
        <div className={styles.songCard}>
          <img src='/demoImage.jpeg' alt="" />
          <div className={styles.songDetails}>
            <h5>Meditate me</h5>
            <h6>Ekoh, Nate Vickers</h6>
          </div>
          <div className={styles.add}>
            <img src="/add.svg" alt="" />
          </div>
        </div>
        <div className="player"></div>
        <div className="navs"></div>
      </section>
    </>
  );
}
