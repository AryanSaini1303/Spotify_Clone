import styles from "./libPlaylistSection.module.css";
import Link from "next/link";

export default function LibPlaylistSection({ minimize, playlists, playlistPosters, num }) {
  // console.log(playlistPosters);
  return (
    <div className={styles.container} style={minimize ? { margin: "0 auto"} : null} >
      {playlists.map((playlist,index) => {
        return (
          <Link href="/" className={styles.playlist} key={playlist.id}>
            <img src={playlistPosters[index]} alt="" />
            {!minimize && (
              <div className={styles.playlistInfo}>
                <h4 className="Name">{playlist.name}</h4>
                <h5 className="otherInfo">
                  Playlist . <span>{num[index]} Songs</span>
                </h5>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
