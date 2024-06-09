import styles from "./infoSection.module.css";
import InfoSongSection from "./infoSongSection";
export default function InfoSection({ className }) {
  return (
    <>
      <div className={className}>
        <header className={styles.navs}>
          <button><img src="/cross.svg" alt="" /></button>
        </header>
        <InfoSongSection/>
        <div className="artistSection"></div>
        <div className="queueSection"></div>
      </div>
    </>
  );
}
