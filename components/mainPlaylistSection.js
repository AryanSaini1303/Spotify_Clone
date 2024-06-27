"use client";
import { useEffect, useState } from "react";
import styles from "./mainPlaylistSection.module.css";

export default function MainPlaylistSection({ sendDataToParent, playlistPosters, sendPlaylistIdToParent }) {
  const [mouseEnter, setMouseEnter] = useState({});

  function handleMouseEnter(id) {
    setMouseEnter((prevStates) => ({ ...prevStates, [id]: true }));
    sendDataToParent(id);
  }

  function handleMouseLeave(id) {
    setMouseEnter((prevStates) => ({ ...prevStates, [id]: false }));
    sendDataToParent('default');
  }

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getPlaylists");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    };
    fetchData();
  }, []);

  function handlePlayButtonClick(e) {
    e.stopPropagation(); // Stops the click event from propagating to the parent elements
    e.preventDefault(); // Prevents the default link behavior
  }

  return (
    <div className={styles.container}>
      {playlists.map((playlist, index) => {
        return (
          <section
            key={playlist.id}
            onClick={()=>{sendPlaylistIdToParent(playlist.id)}}
            className={styles.playlist}
            onMouseEnter={() => handleMouseEnter(playlist.id)}
            onMouseLeave={() => handleMouseLeave(playlist.id)}
          >
            <div className={styles.infoSection}>
              <img src={playlistPosters[index]} alt="" />
              <h4>{playlist.name}</h4>
            </div>
            {mouseEnter[playlist.id] && (
              <div className={styles.playbuttonContainer} onClick={handlePlayButtonClick}>
                <div className={styles.playbutton}>
                  <img src="playButton.svg" alt="" />
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
