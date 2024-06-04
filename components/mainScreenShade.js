import { useEffect, useState } from "react";
import styles from "./mainScreenShade.module.css";

export default function MainScreenShade({playlistId }) {

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

  const accentColors = playlists.map((playlist) => ({
    id: playlist.id,
    color: playlist.accentColor,
  }));

  // Find selected color based on playlistId
  const selectedColor =
    accentColors.find((item) => item.id === playlistId)?.color || "#121212";

  // Define custom styles
  const customStyle = {
    backgroundColor: `${selectedColor}`,
  };

  return (
    <>
      <header className={styles.container1} style={customStyle}></header>
      <footer className={styles.container2}></footer>
    </>
  );
}
