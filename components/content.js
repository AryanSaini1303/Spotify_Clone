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
  const [minInfo,setMinInfo]=useState(false);

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

  function getInfoFlagFromInfoSection(){
    setMinInfo(true);
  }
  function getInfoFlagFromPlayerSection(){
    setMinInfo(!minInfo);
  }
  console.log(minInfo);

  let mainSectionClass = (() => {
    if (minLib&&!minInfo) {
      return styles.minLibMainSection;
    } 
    else if(!minLib&&!minInfo) {
      return styles.mainSection;
    }
    else if(minInfo&&minLib){
      return styles.minInfoMainSection;
    }
    else if(!minLib&&minInfo){
      return styles.minInfoNotLibMainSection;
    }
  })();
  
  // console.log(mainSectionClass);
  return (
    <div className={styles.mainPageContainer}>
      <NavSection className={minLib ? styles.minNavSection : styles.navSection} minimize={minLib} homeFunc={setPlaylistId} navFlag={navSectionFlag}/>
      <LibSection className={!minLib ? styles.libSection : styles.minLibSection} onClick={handleMinLib} minimize={minLib} playlistPosters={playlistPosters} sendPlaylistIdToParent={getplaylistIdFromChild}/>
      <PlayerSection className={styles.playerSection} flagFunc={getInfoFlagFromPlayerSection} minInfoFlag={minInfo}/>
      {!minInfo&&<InfoSection className={!minLib ? styles.infoSection : styles.minInfoSection} flagFunc={getInfoFlagFromInfoSection}/>}
      {!playlistId?<MainSection className={mainSectionClass} playlistPosters={playlistPosters} sendPlaylistIdToParent={getplaylistIdFromChild}/>:<PlaylistSection className={mainSectionClass} id={playlistId}/>}
    </div>
  );
}
