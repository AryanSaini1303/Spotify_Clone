'use client'
import PlayerSection from "@/components/playerSection";
import MainSection from "@/components/mainSection";
import InfoSection from "@/components/infoSection";
import NavSection from "@/components/navSection";
import LibSection from "@/components/libSection";
import { useState } from "react";
import styles from "./content.module.css";
import { usePathname } from "next/navigation";
import PlaylistSection from "./playlistSection";

export default function Content({ playlists, playlistPosters, num, currPlayInfo}) {
  const currentRoute=usePathname();
  // console.log(currentRoute.match("/playlist"));
  const [minLib, setMinLib] = useState(false);

  function handleMinLib() {
    setMinLib(!minLib);
  }

  return (
    <div className={styles.mainPageContainer}>
      <NavSection className={minLib ? styles.minNavSection : styles.navSection} minimize={minLib} />
      <LibSection className={!minLib ? styles.libSection : styles.minLibSection} onClick={handleMinLib} minimize={minLib} playlists={playlists} playlistPosters={playlistPosters} num={num}/>
      <PlayerSection className={styles.playerSection} />
      <InfoSection className={!minLib ? styles.infoSection : styles.minInfoSection} />
      {!currentRoute.startsWith("/playlist")?<MainSection className={!minLib ? styles.mainSection : styles.minMainSection} playlists={playlists} playlistPosters={playlistPosters}/>:<PlaylistSection className={!minLib ? styles.mainSection : styles.minMainSection} currPlayInfo={currPlayInfo}/>}
    </div>
  );
}
