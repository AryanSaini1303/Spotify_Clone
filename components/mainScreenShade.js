import styles from "./mainScreenShade.module.css";

export default function MainScreenShade({ playlists, playlistId }) {
  // Map playlist data to an array of { id, color } objects
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
