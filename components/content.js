'use client'
import PlayerSection from "@/components/playerSection";
import MainSection from "@/components/mainSection";
import InfoSection from "@/components/infoSection";
import NavSection from "@/components/navSection";
import LibSection from "@/components/libSection";
import { useEffect, useState } from "react";
import styles from "./content.module.css";
import { usePathname } from "next/navigation";
import PlaylistSection from "./playlistSection";

export default function Content({id}) {
  const currentRoute=usePathname();
  // console.log(currentRoute.match("/playlist"));
  const [minLib, setMinLib] = useState(false);

  function handleMinLib() {
    setMinLib(!minLib);
  }
  
  const [playlistPosters,setPlaylistsPosters]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch("/api/getPlaylistPosters");
        if(!response.ok){
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data=await response.json();
        setPlaylistsPosters(data);
      }catch(err){
        console.error("Error fetching playlists:",err);
      }
    };
    fetchData();
  },[]);

  return (
    <div className={styles.mainPageContainer}>
      <NavSection className={minLib ? styles.minNavSection : styles.navSection} minimize={minLib} />
      <LibSection className={!minLib ? styles.libSection : styles.minLibSection} onClick={handleMinLib} minimize={minLib} playlistPosters={playlistPosters}/>
      <PlayerSection className={styles.playerSection} />
      <InfoSection className={!minLib ? styles.infoSection : styles.minInfoSection} />
      {!currentRoute.startsWith("/playlist")?<MainSection className={!minLib ? styles.mainSection : styles.minMainSection} playlistPosters={playlistPosters}/>:<PlaylistSection className={!minLib ? styles.mainSection : styles.minMainSection} id={id}/>}
    </div>
  );
}
