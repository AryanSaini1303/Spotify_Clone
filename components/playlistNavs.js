import styles from "./playlistNavs.module.css";
import { useEffect, useState } from "react";
export default function PlaylistNavs({ id, currentId, play }) {
  const [currentFlag,setCurrentFlag]=useState(false);
  // console.log(id);
  // console.log(currentId);
  currentId&&localStorage.setItem('currentId',currentId);
  // console.log(localStorage.getItem('currentId'));
  useEffect(()=>{
      id===localStorage.getItem('currentId')&&setCurrentFlag(true)
  },[localStorage.getItem('currentId')]);
  // console.log(currentFlag);
  return (
    <section className={styles.container}>
      <div className={styles.playnshuffle}>
        <div className={styles.playButton}>
          <img
            src={currentFlag&&play ? "/pause.svg" : "/playButton.svg"}
            alt=""
            style={currentFlag&&play ? null : { marginLeft: "3px" }}
          />
        </div>
        <div className={styles.shuffleButton}>
          <img src="/shuffle.svg" alt="" />
        </div>
      </div>
      <div className={styles.search}>
        <img src="/search.svg" alt="" />
      </div>
    </section>
  );
}
