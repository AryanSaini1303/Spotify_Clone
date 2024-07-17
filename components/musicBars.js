import styles from "./musicBars.module.css";
export default function MusicBars({ customStyle}) {
  return (
    <section className={styles.container} style={customStyle}>
      <div className={`${styles.bar1} ${styles.bar}`}></div>
      <div className={`${styles.bar2} ${styles.bar}`}></div>
      <div className={`${styles.bar3} ${styles.bar}`}></div>
      <div className={`${styles.bar4} ${styles.bar}`}></div>
      <div className={`${styles.bar5} ${styles.bar}`}></div>
    </section>
  );
}
