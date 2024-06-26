import Image from "next/image";
import styles from "./playerSection.module.css";
export default function PlayerSection({ className }) {
  return (
    <>
      <section className={className}>
        <section className={styles.songCard}>
          <img src="/demoImage.jpeg" alt="" />
          <div className={styles.songDetails}>
            <h5>Meditate me</h5>
            <h6>Ekoh, Nate Vickers</h6>
          </div>
          <div className={styles.add}>
            <img src="/add.svg" alt="" />
          </div>
        </section>
        <section className={styles.player}>
          <div className={styles.btns}>
            <div className={`${styles.previousBtn} ${styles.nexprev}`}>
              <Image
                src="/leftNext.svg"
                alt="previous"
                width={22}
                height={22}
                style={{ filter: "invert(100%)" }}
              />
            </div>
            <div className={styles.playBtn}>
              <Image
                src="/playButtonSharp.svg"
                alt="play"
                width={21}
                height={21}
              />
            </div>
            <div className={`${styles.nextBtn} ${styles.nexprev}`}>
              <Image
                src="/rightNext.svg"
                alt="next"
                width={22}
                height={22}
                style={{ filter: "invert(100%)" }}
              />
            </div>
            <div className={`${styles.repeatBtn} ${styles.nexprev}`}>
              <Image
                src="/repeat.svg"
                alt="repeat"
                width={22}
                height={22}
                style={{ filter: "invert(100%)" }}
              />
            </div>
          </div>
        </section>
        <div className="navs"></div>
      </section>
    </>
  );
}
