import styles from "./playlistSection.module.css";
import { useEffect, useState } from "react";

export default function PlaylistSection({ className, id }) {
  const [currPlayInfo, setCurrPlayInfo] = useState([]);

  useEffect(() => {
    if (!id) return; // Ensure id is defined

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getCurrentPlaylist?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setCurrPlayInfo(data);
      } catch (err) {
        console.error("Error fetching playlist info:", err);
      }
    };

    fetchData();
  }, [id]); // Include id in dependency array

  let totalSongsDuration = 0;
  if (currPlayInfo.songInfo) {
    currPlayInfo.songInfo.map((song) => {
      totalSongsDuration += song.duration;
    });
  }

  return (
    <div className={className}>
      <div
        className={styles.shade}
        style={{ background: `linear-gradient(${currPlayInfo.color},#121212)` }}
      ></div>
      <header className={styles.headerSection}>
        <img src={currPlayInfo.poster} alt="" />
        <div className={styles.playlistInfo}>
          <h5>Playlist</h5>
          <h1>{currPlayInfo.name}</h1>
          <h5>
            {currPlayInfo.songInfo?.length || 0} songs,
            {Math.floor(totalSongsDuration / 3600) !== 0 ? (
              <span> {Math.floor(totalSongsDuration / 3600)} hr</span>
            ) : null}
            <span> {Math.floor((totalSongsDuration % 3600) / 60)} min</span>
          </h5>
        </div>
      </header>
    </div>
  );
}