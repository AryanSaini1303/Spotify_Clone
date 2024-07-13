import InfoArtistSection from "./infoArtistSection";
import styles from "./infoSection.module.css";
import InfoSongSection from "./infoSongSection";
export default function InfoSection({ className, flagFunc, info }) {
  return (
    <>
      <div className={className}>
        <header className={styles.navs} onClick={flagFunc}>
          <button><img src="/cross.svg" alt="exit" /></button>
        </header>
        <InfoSongSection info={info}/>
        <InfoArtistSection info={info}/>
        {/* <div className="queueSection"></div> */}
      </div>
    </>
  );
}
