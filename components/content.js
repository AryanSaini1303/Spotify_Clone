"use client";
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
  const [playlistId, setPlaylistId] = useState();
  const [navSectionFlag, setNavSectionFlag] = useState(true);
  const [minInfo, setMinInfo] = useState(false);
  const [currentSongInfo, setCurrentSongInfo] = useState();
  const [play, setPlay] = useState(false);
  const [playerPlaylistId, setPlayerPlaylistId] = useState();
  const [searchSectionflag, setSearchSectionflag] = useState(false);
  const [playlistNavsPause, setPlaylistNavsPause] = useState(true);
  const [searchSectionPause, setSearchSectionPause] = useState(true);
  const [queueSongsInfo, setQueueSongsInfo] = useState();
  const [queueSongNum, setQueueSongNum] = useState(0);
  const [queueFlag, setQueueFlag] = useState();
  const [currentPlaylistId,setCurrentPlaylistId]=useState();
  console.log(playlistId);
  useEffect(()=>{
    setQueueFlag(localStorage.getItem("queueFlag"));
  },[])
  useEffect(() => {
    currentSongInfo &&
      window.localStorage.setItem(
        "currentSongInfo",
        JSON.stringify(currentSongInfo)
      );
    // Here first we store the "currentSongInfo" if its available in the localStorage and as the data is an object we first stringify it as localStorage stores strings and if we don't do so then we accidentally store [object Object] which is a string representation of an object instance, but its value is never read.
    let data = window.localStorage.getItem("currentSongInfo");
    !currentSongInfo && setCurrentSongInfo(JSON.parse(data));
    // Then in the end we retrieve our stringified data and parse it to use it as an object again
    !minLib && setPlaylistNavsPause(false);
  }, [currentSongInfo]);
  const [defaultSongRender, setDefaultSongRender] = useState(true);

  function handleMinLib() {
    setMinLib(!minLib);
  }

  const [playlistPosters, setPlaylistsPosters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getPlaylistPosters");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setPlaylistsPosters(data);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    };
    fetchData();
  }, []);

  function getplaylistIdFromChild(id) {
    setPlaylistId(id);
    setSearchSectionflag(false);
    setNavSectionFlag(false);
  }

  function getInfoFlagFromInfoSection() {
    setMinInfo(true);
  }
  function getInfoFlagFromPlayerSection() {
    setMinInfo(!minInfo);
  }
  function getCurrentSongInfo(info) {
    setCurrentSongInfo(info);
    setDefaultSongRender(false);
    setQueueFlag(false);
    localStorage.setItem("queueFlag",false);
    localStorage.removeItem("playSearchedSongId");
  }
  function getPlayFromPlayerSection(id, flag) {
    console.log(flag);
    setPlayerPlaylistId(id);
    !flag ? setPlay(false) : setPlay(true);
  }
  function getSearchSectionFlag(flag) {
    setSearchSectionflag(flag);
  }
  function getSearchedSongInfo(song) {
    setCurrentSongInfo(song);
    setDefaultSongRender(false);
  }
  function getPauseFromPlaylistNavs(flag) {
    setPlaylistNavsPause(flag);
  }
  function getSearchSectionPause(flag) {
    setSearchSectionPause(flag);
  }
  function getCurrSongsInfo(info) {
    setCurrentPlaylistId(playlistId);
    setQueueSongsInfo(info);
    setQueueFlag(true);
    localStorage.setItem("queueFlag",true);
    localStorage.setItem("currentId", currentPlaylistId);
  }
  console.log(queueSongsInfo);
  useEffect(() => {
    console.log(queueSongNum);
    if(queueSongsInfo&&queueSongsInfo[queueSongNum]){
      setCurrentSongInfo(queueSongsInfo[queueSongNum]);
      localStorage.setItem("currentSongId",queueSongsInfo[queueSongNum].id);
      setPlaylistNavsPause(false);
      localStorage.setItem("queueSongNum",queueSongNum);
    }
    else{
      // setQueueFlag(false);
      setPlaylistNavsPause(true);
    }
  }, [queueSongsInfo,queueSongNum]);
  useEffect(()=>{
    setQueueSongNum(0);
  },[queueSongsInfo])
  useEffect(() => {
    if (!playlistId) {
      setNavSectionFlag(true);
    }
  }, [playlistId]);
  let mainSectionClass = (() => {
    if (minLib && !minInfo) {
      return styles.minLibMainSection;
    } else if (!minLib && !minInfo) {
      return styles.mainSection;
    } else if (minInfo && minLib) {
      return styles.minInfoMainSection;
    } else if (!minLib && minInfo) {
      return styles.minInfoNotLibMainSection;
    }
  })();
  return (
    <div className={styles.mainPageContainer}>
      <NavSection
        className={minLib ? styles.minNavSection : styles.navSection}
        minimize={minLib}
        homeFunc={setPlaylistId}
        navFlag={navSectionFlag}
        searchFunc={getSearchSectionFlag}
      />
      <LibSection
        className={!minLib ? styles.libSection : styles.minLibSection}
        onClick={handleMinLib}
        minimize={minLib}
        playlistPosters={playlistPosters}
        sendPlaylistIdToParent={getplaylistIdFromChild}
      />
      <PlayerSection
        className={styles.playerSection}
        flagFunc={getInfoFlagFromPlayerSection}
        minInfoFlag={minInfo}
        info={currentSongInfo}
        defaultSongRender={defaultSongRender}
        playStatus={getPlayFromPlayerSection}
        songCurrentPlaylistId={currentPlaylistId}
        playlistNavsPause={playlistNavsPause}
        getPauseFromPlaylistNavs={getPauseFromPlaylistNavs}
        searchSectionPause={searchSectionPause}
        getSearchSectionPause={getSearchSectionPause}
        queueFlag={queueFlag}
        setQueueSongNum={setQueueSongNum}
        queueSongNum={queueSongNum}
      />
      {!minInfo && (
        <InfoSection
          className={!minLib ? styles.infoSection : styles.minInfoSection}
          flagFunc={getInfoFlagFromInfoSection}
          info={currentSongInfo}
        />
      )}
      {!playlistId ? (
        <MainSection
          className={mainSectionClass}
          playlistPosters={playlistPosters}
          sendPlaylistIdToParent={getplaylistIdFromChild}
          searchSectionflag={searchSectionflag}
          play={play}
          getSearchedSongInfo={getSearchedSongInfo}
          getPauseFromPlaylistNavs={getPauseFromPlaylistNavs}
          getSearchSectionPause={getSearchSectionPause}
        />
      ) : (
        <PlaylistSection
          className={mainSectionClass}
          id={playlistId}
          getCurrentSongInfo={getCurrentSongInfo}
          play={play}
          playerPlaylistId={playerPlaylistId}
          searchSectionflag={searchSectionflag}
          getSearchedSongInfo={getSearchedSongInfo}
          getPauseFromPlaylistNavs={getPauseFromPlaylistNavs}
          getSearchSectionPause={getSearchSectionPause}
          getCurrSongsInfo={getCurrSongsInfo}
          queueFlag={queueFlag}
        />
      )}
    </div>
  );
}
