import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./searchSection.module.css";
import { Ubuntu } from "next/font/google";
import SearchedSongsLoader from "./searchedSongsLoader";
import MusicBars from "./musicBars";
const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin"],
});
export default function SearchSection({
  getSearchedSongInfo,
  play,
  getSearchSectionPause,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const [inputFlag, setInputFlag] = useState(false);
  const [hover, setHover] = useState({});
  const [songId, setSongId] = useState();
  const [topSongHover, setTopSongHover] = useState();
  const searchRef = useRef(null);
  function handleChange(e) {
    setResults(undefined);
    if (e.target.value.length === 0 || e.target.value.trim().length === 0) {
      setInputFlag(false);
    } else {
      setInputFlag(true);
    }
    setQuery(e.target.value);
  }
  let onClickStyle = {
    color: "#1FDF64",
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  const handleSearch = async () => {
    const res = await fetch(`/api/getSearchedSongs?query=${query.trim()}`);
    const data = await res.json();
    setResults(data);
  };
  function handldMouseEnter(id) {
    setHover((prevStates) => ({ ...prevStates, [id]: true }));
  }
  function handldMouseLeave(id) {
    setHover((prevStates) => ({ ...prevStates, [id]: false }));
  }
  function handleOptClick(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  function handleSongClick(song) {
    if (songId !== song.id) {
      localStorage.removeItem("currentId");
      getSearchedSongInfo(song);
      song && localStorage.setItem("playSearchedSongId", song.id);
      setSongId(localStorage.getItem("playSearchedSongId"));
    } else if (songId === song.id && play) {
      getSearchSectionPause(true);
    } else if (songId === song.id && !play) {
      getSearchSectionPause(false);
    }
  }
  function handleTopSongEnter() {
    setTopSongHover(true);
  }
  function handleTopSongLeave() {
    setTopSongHover(false);
  }
  useEffect(() => {
    setSongId(localStorage.getItem("playSearchedSongId"));
  }, [results]);
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <section className={styles.searchContainer}>
      <header className={styles.searchComponent}>
        <Image
          src="/search.svg"
          width={17}
          height={17}
          style={{ filter: "invert(100%)" }}
          className={styles.searchImg}
        />
        <input
          type="text"
          id={styles.songInput}
          placeholder="What do you want to play?"
          tabIndex={0}
          onChange={handleChange}
          ref={searchRef}
        />
      </header>
      <section className={styles.songsSection}>
        {results && results.length != [] && (
          <section>
            <header>
              <h1 className={ubuntu.className}>Top Result</h1>
            </header>
            <div
              className={styles.topSong}
              key={results[0].id}
              onMouseEnter={handleTopSongEnter}
              onMouseLeave={handleTopSongLeave}
            >
              <img src={results[0].poster} alt="Song's Poster" />
              <h1 style={results[0].id === songId ? onClickStyle : null}>
                {results[0].title}
              </h1>
              <div className={styles.bottomInfo}>
                <h5 className={styles.type}>Song</h5>
                <div className={styles.dot}></div>
                <h5>{results[0].artist}</h5>
              </div>
              {topSongHover && (
                <div
                  className={styles.playButton}
                  onClick={() => {
                    handleSongClick(results[0]);
                  }}
                >
                  <Image
                    src={
                      results[0].id === songId && play
                        ? "/pause.svg"
                        : "/playButtonSharp.svg"
                    }
                    height={results[0].id === songId && play ? 20 : 30}
                    width={results[0].id === songId && play ? 20 : 30}
                    style={
                      results[0].id === songId && play
                        ? null
                        : { marginLeft: "3px" }
                    }
                  />
                </div>
              )}
            </div>
          </section>
        )}
        <section>
          {results && results.length != [] ? (
            results.map((song, index) => (
              <>
                {index != 0 && results && results.length != [] && (
                  <>
                    {index === 1 && (
                      <h1
                        className={`${ubuntu.className} ${styles.songsHeading}`}
                      >
                        Songs
                      </h1>
                    )}
                    <div
                      className={styles.song}
                      key={song.id}
                      onMouseEnter={() => {
                        handldMouseEnter(song.id);
                      }}
                      onMouseLeave={() => {
                        handldMouseLeave(song.id);
                      }}
                      onClick={() => {
                        handleSongClick(song);
                      }}
                    >
                      <img
                        src={song.poster}
                        alt="Song's Poster"
                        style={
                          songId == song.id && play
                            ? { filter: "brightness(25%)" }
                            : null
                        }
                      />
                      {songId == song.id && play && (
                        <div className={styles.musicBars}>
                          <MusicBars />
                        </div>
                      )}
                      <div className={styles.info}>
                        <h4
                          className={`${styles.title}`}
                          style={songId == song.id ? onClickStyle : null}
                        >
                          {song.title}
                        </h4>
                        <h6 className={`${styles.artist}`}>{song.artist}</h6>
                      </div>
                      <time datetime={song.duration}>
                        {Math.floor(song.duration / 60)}:{song.duration % 60}
                      </time>
                      <div
                        className={styles.options}
                        onClick={handleOptClick}
                        style={
                          !hover[song.id]
                            ? { opacity: "0", pointerEvents: "none" }
                            : null
                        }
                      >
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))
          ) : results && results.length == 0 && inputFlag ? (
            <h1 className={`${ubuntu.className} ${styles.notFound}`}>
              No results found for &quot;{query}&quot;
            </h1>
          ) : (
            inputFlag && <SearchedSongsLoader />
          )}
        </section>
      </section>
    </section>
  );
}
