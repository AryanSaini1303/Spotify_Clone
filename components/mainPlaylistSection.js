"use client";
import Link from "next/link";
import styles from "./mainPlaylistSection.module.css";
import { useState } from "react";
export default function MainPlaylistSection({ playlists, playlistPosters, sendDataToParent }) {
  const [mouseEnter, setMouseEnter] = useState({});
  // We initialized the state as the with an empty object which will hold all the states for subsequent playlists
  function handleMouseEnter(id) {
    // here we first make a copy of the current states using the spread operator "..." with all the properties and update the state with particular id as true/false
    setMouseEnter((prevStates) => ({ ...prevStates, [id]: true }));
    sendDataToParent(id);
  }
  function handleMouseLeave(id) {
    setMouseEnter((prevStates) => ({ ...prevStates, [id]: false }));
    sendDataToParent('default');
  }
  return (
    <div className={styles.container}>
      {playlists.map((playlist, index) => {
        return (
          <Link
            key={playlist.id}
            href=""
            className={styles.playlist}
            onMouseEnter={() => handleMouseEnter(playlist.id)}
            onMouseLeave={() => handleMouseLeave(playlist.id)}
          >
            <div className={styles.infoSection}>
              <img src={playlistPosters[index]} alt="" />
              <h4>{playlist.name}</h4>
            </div>
            {mouseEnter[playlist.id] && (
              <div className={styles.playbuttonContainer}>
                <div className={styles.playbutton}>
                  <img src="playButton.svg" alt="" />
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
