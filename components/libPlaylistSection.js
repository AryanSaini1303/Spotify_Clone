import styles from "./libPlaylistSection.module.css";
import Link from 'next/link';
export default function LibPlaylistSection({minimize}) {
  return (
    <div className={styles.container} style={minimize?{margin:"0 auto"}:null}>
      <Link href="/" className={styles.playlist}>
          <img src="demoImage.jpeg" alt=""/>
          {!minimize&&<div className={styles.playlistInfo}>
            <h4 className="Name">Wake Up</h4>
            <h5 className="otherInfo">
              Playlist . <span>10 songs</span>
            </h5>
          </div>}
      </Link>
    </div>
  );
}
