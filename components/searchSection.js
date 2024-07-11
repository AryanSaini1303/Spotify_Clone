import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./searchSection.module.css";
export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function handleChange(e){
    setQuery(e.target.value)
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
    console.log(results);
  };
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
    </section>
  );
}
