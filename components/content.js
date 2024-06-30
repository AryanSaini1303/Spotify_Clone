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
  const [currentSongInfo, setCurrentSongInfo] = useState({
    id: "clwx8vbkj0006fq3l2fic8h59",
    title: "Hold Me While You Wait",
    artist: "Lewis Capaldi",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/9/94/Lewis_Capaldi_-_Hold_Me_While_You_Wait.png",
    duration: 206,
    artistPoster:
      "https://i.scdn.co/image/ab6761610000e5ebea7538654040e553a7b0fc28",
    artistDescription:
      'Lewis Capaldi is a Scottish singer-songwriter known for his powerful voice and emotive ballads. He gained widespread recognition with his hit single "Someone You Loved," which topped charts worldwide. Capaldi\'s music often deals with themes of love, loss, and personal introspection, delivered with a raw and heartfelt vocal style.',
  });
  // For the time being i'm providing a default song for the content to be rendered
  const [defaultSongRender,setDefaultSongRender]=useState(true);

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
  }
  // console.log(currentSongInfo);
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

  // console.log(mainSectionClass);
  return (
    <div className={styles.mainPageContainer}>
      <NavSection
        className={minLib ? styles.minNavSection : styles.navSection}
        minimize={minLib}
        homeFunc={setPlaylistId}
        navFlag={navSectionFlag}
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
        />
      ) : (
        <PlaylistSection
          className={mainSectionClass}
          id={playlistId}
          getCurrentSongInfo={getCurrentSongInfo}
        />
      )}
    </div>
  );
}
