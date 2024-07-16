import styles from "./playlistSection.module.css";
import { useEffect, useState } from "react";
import PlaylistSongsSection from "./playlistSongsSection";
import PlaylistSectionLoader from "./playlistSectionLoader";
import SearchSection from "./searchSection";

export default function PlaylistSection({
  className,
  id,
  getCurrentSongInfo,
  play,
  playerPlaylistId,
  searchSectionflag,
  getSearchedSongInfo,
  getPauseFromPlaylistNavs,
  getSearchSectionPause
}) {
  const [currPlayInfo, setCurrPlayInfo] = useState([]);
  const [dataFlag, setDataFlag] = useState(false);
  useEffect(() => {
    if (!id) return; // Ensure id is defined
    setDataFlag(false);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getCurrentPlaylist?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setCurrPlayInfo(data);
        setDataFlag(true);
      } catch (err) {
        console.error("Error fetching playlist info:", err);
      }
    };

    fetchData();
  }, [id]); // Include id in dependency array

  // console.log(dataFlag);

  let totalSongsDuration = 0;
  if (currPlayInfo.songInfo) {
    currPlayInfo.songInfo.map((song) => {
      totalSongsDuration += song.duration;
    });
  }

  return (
    <div
      className={className}
      style={!searchSectionflag?{
        background: `linear-gradient(${
          dataFlag ? currPlayInfo.color : "#121212"
        }, #121212)`,
      }:null}
    >
      {searchSectionflag ? (
        <SearchSection getSearchedSongInfo={getSearchedSongInfo} play={play} getSearchSectionPause={getSearchSectionPause}/>
      ) : (
        <>
          {dataFlag ? (
            <>
              <header className={styles.headerSection}>
                <img src={currPlayInfo.poster} alt="Playlist's Poster" />
                <div className={styles.playlistInfo}>
                  <h5>Playlist</h5>
                  <h1>{currPlayInfo.name}</h1>
                  <h5>
                    {currPlayInfo.songInfo?.length || 0} songs,
                    {Math.floor(totalSongsDuration / 3600) !== 0 ? (
                      <span> {Math.floor(totalSongsDuration / 3600)} hr</span>
                    ) : null}
                    <span>
                      {" "}
                      {Math.floor((totalSongsDuration % 3600) / 60)} min
                    </span>
                  </h5>
                </div>
              </header>
              <PlaylistSongsSection
                currPlayInfo={currPlayInfo}
                getCurrentSongInfo={getCurrentSongInfo}
                playerPlay={play}
                playerPlaylistId={playerPlaylistId}
                getPauseFromPlaylistNavs={getPauseFromPlaylistNavs}
              />
            </>
          ) : (
            <div>
              <PlaylistSectionLoader />
            </div>
          )}
        </>
      )}
    </div>
  );
}
