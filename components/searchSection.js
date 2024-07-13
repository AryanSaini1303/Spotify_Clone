import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./searchSection.module.css";
import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin"],
});
export default function SearchSection({getSearchedSongInfo}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const [inputFlag, setInputFlag] = useState(false);
  const [hover, setHover] = useState({});
  const [songId,setSongId]=useState();

  function handleChange(e) {
    setResults(undefined);
    if (e.target.value.length === 0 || e.target.value.trim().length===0) {
      setInputFlag(false);
    } else {
      setInputFlag(true);
    }
    setQuery(e.target.value);
  }
  let onClickStyle = {
    color: "#1FDF64"
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
  function handleOptClick(e){
    e.stopPropagation();
    e.preventDefault();
  }
  function handleSongClick(song){
    localStorage.removeItem("currentId");
    getSearchedSongInfo(song);
    song&&localStorage.setItem("playSearchedSongId",song.id);
    setSongId(localStorage.getItem("playSearchedSongId"));
  }
  useEffect(()=>{
    setSongId(localStorage.getItem("playSearchedSongId"));
  },[results])
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
        />
      </header>
      <section className={styles.songsSection}>
        {results && results.length != [] && (
          <h1 className={ubuntu.className}>Songs</h1>
        )}
        {results && results.length != [] ? (
          results.map((song) =>(
            <div
              className={styles.song}
              key={song.id}
              onMouseEnter={()=>{handldMouseEnter(song.id)}}
              onMouseLeave={()=>{handldMouseLeave(song.id)}}
              onClick={()=>{handleSongClick(song)}}
            >
              <img src={song.poster} alt="Song's Poster" />
              <div className={styles.info}>
                <h4 className={`${styles.title}`} style={songId==song.id?onClickStyle:null}>{song.title}</h4>
                <h6 className={`${styles.artist}`} style={songId==song.id?onClickStyle:null}>{song.artist}</h6>
              </div>
              <time datetime={song.duration}>
                {Math.floor(song.duration / 60)}:{song.duration % 60}
              </time>
                <div className={styles.options} onClick={handleOptClick} style={!hover[song.id]?{opacity:"0",pointerEvents:"none"}:null}>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                </div>
            </div>
          ))
        ) : results && results.length == 0 && inputFlag ? (
          <h1 className={ubuntu.className}>Not Found</h1>
        ) : (
          inputFlag && <h1 className={ubuntu.className}>Loading...</h1>
        )}
      </section>
    </section>
  );
}
