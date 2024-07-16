"use client";
import { useEffect, useState } from "react";
import styles from "./mainPlaylistSection.module.css";

export default function MainPlaylistSection({
  sendDataToParent,
  playlistPosters,
  sendPlaylistIdToParent,
  play,
  getPauseFromPlaylistNavs
}) {
  const [mouseEnter, setMouseEnter] = useState({});
  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    setCurrentId(localStorage.getItem("currentId"));
  }, [play]);
  function handleMouseEnter(id) {
    setMouseEnter((prevStates) => ({ ...prevStates, [id]: true }));
    sendDataToParent(id);
  }

  function handleMouseLeave(id) {
    setMouseEnter((prevStates) => ({ ...prevStates, [id]: false }));
    sendDataToParent("default");
  }

  function handleClick(id){
    console.log(id);
    play&&currentId===id?getPauseFromPlaylistNavs(true):getPauseFromPlaylistNavs(false);
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
            onClick={() => {
              sendPlaylistIdToParent(playlist.id);
            }}
            className={styles.playlist}
            onMouseEnter={() => handleMouseEnter(playlist.id)}
            onMouseLeave={() => handleMouseLeave(playlist.id)}
          >
            <div className={styles.infoSection}>
              <img src={playlistPosters[index]} alt="Playlist's Poster" />
              <h4>{playlist.name}</h4>
            </div>
            {mouseEnter[playlist.id] && (
              <div
                className={styles.playbuttonContainer}
                onClick={handlePlayButtonClick}
              >
                <div className={styles.playbutton} onClick={()=>{handleClick(playlist.id)}}>
                  <img
                    src={play&&currentId===playlist.id ? "pause.svg" : "playButton.svg"}
                    alt="Play Button"
                    style={
                      play&&currentId===playlist.id ?{ marginLeft: "-0.5px" }:{ marginLeft: "1.5px" }
                    }
                  />
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
