import { useEffect, useState } from "react";
import styles from "./libPlaylistSection.module.css";

export default function LibPlaylistSection({ minimize, playlistPosters, sendPlaylistIdToParent }) {
  const [num, setNum] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [numResponse, playlistsResponse] = await Promise.all([
          fetch("/api/getNumSongsPlaylist"),
          fetch("/api/getPlaylists"),
        ]);

        if (!numResponse.ok || !playlistsResponse.ok) {
          throw new Error(`Error fetching data: ${numResponse.statusText} / ${playlistsResponse.statusText}`);
        }

        const numData = await numResponse.json();
        const playlistsData = await playlistsResponse.json();

        setNum(numData);
        setPlaylists(playlistsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container} style={minimize ? { margin: "0 auto" } : null}>
      {playlists.map((playlist, index) => {
        return (
          <section
            className={styles.playlist}
            key={playlist.id}
            onClick={() => {
              sendPlaylistIdToParent(playlist.id);
            }}
          >
            <img src={playlistPosters[index]} alt="" />
            {!minimize && (
              <div className={styles.playlistInfo}>
                <h4 className="Name">{playlist.name}</h4>
                <h5 className="otherInfo">
                  Playlist | <span>{num[index]} Songs</span>
                </h5>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
