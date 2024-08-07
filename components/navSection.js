"use client";
import { useEffect, useState } from "react";
import styles from "./navSection.module.css";
import Link from "next/link";
export default function NavSection({ className, minimize, homeFunc, navFlag, searchFunc }) {
  const [homeColor, setHomeColor] = useState("rgb(122, 122, 122)");
  function handleHomeClick() {
    setHomeColor("white");
    setSearchColor("rgb(122, 122, 122)");
    homeFunc("");
    searchFunc(false);
  }
  const [searchColor, setSearchColor] = useState("rgb(122, 122, 122)");
  function handleSearchClick() {
    setHomeColor("rgb(122, 122, 122)");
    setSearchColor("white");
    homeFunc("");
    searchFunc(true);
  }
  useEffect(()=>{
    if (!navFlag) {
      setSearchColor("rgb(122, 122, 122)");
      setHomeColor("rgb(122, 122, 122)");
    }
    if(navFlag&&searchColor!='white'){
      setHomeColor("white");
    }
  },[navFlag]);
  // console.log(navFlag);
  return (
    <>
      <div className={className}>
        <div className={styles.links} onClick={handleHomeClick}>
          <div className={styles.navs} style={{ color: homeColor }}>
            {homeColor == "rgb(122, 122, 122)" ? (
              <svg
                viewBox="0 0 23 23"
                fill="currentColor"
                height="1.7em"
                width="1.7em"
                style={minimize ? { margin: "auto" } : null}
              >
                <path d="M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42A1 1 0 003 13h1v7a2 2 0 002 2h12a2 2 0 002-2v-7h1a1 1 0 001-1 1 1 0 00-.29-.71zM6 20v-9.59l6-6 6 6V20z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1.7em"
                width="1.7em"
                style={minimize ? { margin: "auto" } : null}
              >
                <path d="M12.74 2.32a1 1 0 00-1.48 0l-9 10A1 1 0 003 14h2v7a1 1 0 001 1h12a1 1 0 001-1v-7h2a1 1 0 001-1 1 1 0 00-.26-.68z" />
              </svg>
            )}
            {!minimize && <h4>Home</h4>}
          </div>
        </div>
        <Link href="/" className={styles.links} onClick={handleSearchClick}>
          <div className={styles.navs} style={{ color: searchColor }}>
            {searchColor == "rgb(122, 122, 122)" ? (
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1.7em"
                width="1.7em"
                style={minimize ? { margin: "auto" } : null}
              >
                <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 15 15"
                height="1.7em"
                width="1.7em"
                style={minimize ? { margin: "auto" } : null}
              >
                <path
                  fill="currentColor"
                  d="M6.5 0a6.5 6.5 0 104.23 11.436l3.416 3.418.708-.708-3.418-3.417A6.5 6.5 0 006.5 0z"
                />
              </svg>
            )}
            {!minimize && <h4>Search</h4>}
          </div>
        </Link>
      </div>
    </>
  );
}
