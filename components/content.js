'use client'
import PlayerSection from "@/components/playerSection";
import MainSection from "@/components/mainSection";
import InfoSection from "@/components/infoSection";
import NavSection from "@/components/navSection";
import LibSection from "@/components/libSection";
import { useEffect, useState } from "react";
import styles from "./content.module.css";
import PlaylistSection from "./playlistSection";

export default function Content() {
  const [minLib, setMinLib] = useState(true);
  const [playlistId,setPlaylistId]=useState();
  const [navSectionFlag,setNavSectionFlag]=useState(true);

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

  function getplaylistIdFromChild(id){
    setPlaylistId(id);
    setNavSectionFlag(false);
  }
  // console.log(playlistId);
  return (
    <div className={styles.mainPageContainer}>
      <NavSection className={minLib ? styles.minNavSection : styles.navSection} minimize={minLib} homeFunc={setPlaylistId} navFlag={navSectionFlag}/>
      <LibSection className={!minLib ? styles.libSection : styles.minLibSection} onClick={handleMinLib} minimize={minLib} playlistPosters={playlistPosters} sendPlaylistIdToParent={getplaylistIdFromChild}/>
      <PlayerSection className={styles.playerSection} />
      <InfoSection className={!minLib ? styles.infoSection : styles.minInfoSection} />
      {!playlistId?<MainSection className={!minLib ? styles.mainSection : styles.minMainSection} playlistPosters={playlistPosters} sendPlaylistIdToParent={getplaylistIdFromChild}/>:<PlaylistSection className={!minLib ? styles.mainSection : styles.minMainSection} id={playlistId}/>}
    </div>
  );
}
