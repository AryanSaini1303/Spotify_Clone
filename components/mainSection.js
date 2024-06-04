import { useState } from "react";
import MainPlaylistSection from "./mainPlaylistSection";
import MainScreenShade from "./mainScreenShade";
import styles from "./mainSection.module.css";
import { Dosis } from "next/font/google";

const dosis = Dosis({
  weight: "700",
  subsets: ["latin"],
});
export default function MainSection({ className, playlists, playlistPosters }) {
  const time = new Date().getHours();
  // console.log(time);
  let greeting;
  if (time >= 5 && time < 12) {
    greeting = "Good Morning";
  } else if (time >= 12 && time < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const [childData, setChildData] = useState(null);
  const handleDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <>
      <div className={className}>
        <MainScreenShade playlists={playlists} playlistId={childData}/>
        <div className={styles.container}>
          <h1 className={dosis.className}>{greeting}</h1>
          <MainPlaylistSection
            playlistPosters={playlistPosters}
            sendDataToParent={handleDataFromChild}
          />
        </div>
      </div>
    </>
  );
}
