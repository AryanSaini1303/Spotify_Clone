import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./searchSection.module.css";
import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin"],
});
export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const [inputFlag, setInputFlag] = useState(false);
  const [hover, setHover] = useState({});

  function handleChange(e) {
    setResults(undefined);
    if (e.target.value.length === 0) {
      setInputFlag(false);
    } else {
      setInputFlag(true);
    }
    setQuery(e.target.value);
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  const handleSearch = async () => {
    const res = await fetch(`/api/getSearchedSongs?query=${query}`);
    const data = await res.json();
    setResults(data);
  };
  // console.log(results);
  // console.log(inputFlag);
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
          results.map((song) => (
            <div
              className={styles.song}
              key={song.id}
              onMouseEnter={()=>{handldMouseEnter(song.id)}}
              onMouseLeave={()=>{handldMouseLeave(song.id)}}
            >
              <img src={song.poster} alt="Song's Poster" />
              <div className={styles.info}>
                <h4 className={`${styles.title}`}>{song.title}</h4>
                <h6 className={`${styles.artist}`}>{song.artist}</h6>
              </div>
              <time datetime={song.duration}>
                {Math.floor(song.duration / 60)}:{song.duration % 60}
              </time>
              {hover[song.id] && (
                <div className={styles.options} onClick={handleOptClick}>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                </div>
              )}
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
