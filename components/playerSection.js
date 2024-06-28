import Image from "next/image";
import styles from "./playerSection.module.css";
import { useRef, useState, useEffect } from "react";

export default function PlayerSection({ className,flagFunc,minInfoFlag }) {
  const progressRef = useRef(null);
  const playPauseRef = useRef(null);
  const songRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [progressBarValue,setProgressBarValue]=useState(0);
  const [progressMouseEnter,setProgressMouseEnter]=useState(false);
  const [progressMouseLeave,setProgressMouseLeave]=useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  useEffect(()=>{
    if (songRef.current) {
      setSongDuration(`${Math.floor(songRef.current.duration/60)}:${Math.round(songRef.current.duration%60)}`)
      progressRef.current.max = songRef.current.duration;
      progressRef.current.value = 0;  
    }
  },[])
  
  function updateProgressBar() {
    if (songRef.current && progressRef.current) {
      progressRef.current.value = songRef.current.currentTime;
      setSongCurrentTime(`${Math.floor(songRef.current.currentTime/60)}:${Math.round(songRef.current.currentTime%60)<10?"0":""}${Math.round(songRef.current.currentTime%60)}`);
      setProgressBarValue((songRef.current.currentTime/songRef.current.duration)*100);
    }
  }

  function resetProgressBar() {
    if (progressRef.current) {
      progressRef.current.value = 0;
      setPlay(!play);
      setProgressBarValue(0);
      songRef.current.currentTime=0;
    }
  }

  function updateSongProgress() {
    if (songRef.current) {
      songRef.current.currentTime = progressRef.current.value;
      // if (!play) {
      //   setPlay((prevPlay) => {
      //     const newPlay = !prevPlay;
      //     if (newPlay) {
      //       songRef.current.play();
      //     } else {
      //       songRef.current.pause();
      //     }
      //     return newPlay;
      //   });
      // }
      // Above section of code automatically plays the song if we play with the progress bar and the song is paused, for the time being the song won't play from the point where it is set on the progress bar by the user until and unless the user taps the play button
    }
  }

  function handlePlayClick() {
    setPlay((prevPlay) => {
      const newPlay = !prevPlay;
      if (newPlay) {
        songRef.current.play();
      } else {
        songRef.current.pause();
      }
      return newPlay;
    });
  }

  function handleProgressMouseEnter(){
    setProgressMouseEnter(!progressMouseEnter);
    setProgressMouseLeave(false);
  }
  function handleProgressMouseLeave(){
    setProgressMouseEnter(false);
    setProgressMouseLeave(!progressMouseLeave);
  }
  
  let backgroundColor;
  if(progressMouseEnter){
    backgroundColor='#1FDF64'
  }
  if(progressMouseLeave){
    backgroundColor='white';
  }
  const overlayStyle = {
    width: `${progressBarValue}%`,
    backgroundColor
  };
  // console.log(minInfoFlag);
  return (
    <>
      <section className={className}>
        <section className={styles.songCard}>
          <img src="/demoImage.jpeg" alt="" />
          <div className={styles.songDetails}>
            <h5>Meditate me</h5>
            <h6>Ekoh, Nate Vickers</h6>
          </div>
          <div className={styles.add}>
            <img src="/add.svg" alt="" />
          </div>
        </section>
        <section className={styles.player}>
          <audio
            ref={songRef}
            onTimeUpdate={updateProgressBar}
            onEnded={resetProgressBar}
          >
            <source src="/songs/onMyWay.mp3" type="audio/mpeg" />
          </audio>
          <div className={styles.btns}>
            <div className={`${styles.previousBtn} ${styles.nexprev}`}>
              <Image
                src="/leftNext.svg"
                alt="previous"
                width={22}
                height={22}
                style={{ filter: "invert(100%)" }}
              />
            </div>
            <div
              className={styles.playBtn}
              ref={playPauseRef}
              onClick={handlePlayClick}
            >
              <Image
                src={!play ? "/playButtonSharp.svg" : "/pause.svg"}
                alt="play"
                width={!play ? 21 : 15}
                height={!play ? 21 : 15}
                style={!play ? { paddingLeft: "0.15rem" } : null}
              />
            </div>
            <div className={`${styles.nextBtn} ${styles.nexprev}`}>
              <Image
                src="/rightNext.svg"
                alt="next"
                width={22}
                height={22}
                style={{ filter: "invert(100%)" }}
              />
            </div>
            <div className={styles.progressBarContainer}>
              <h6 className={styles.currentTime}>{songCurrentTime==0?"0:00":songCurrentTime}</h6>
              <div className={styles.overlay} style={overlayStyle}></div>
              <input
                onMouseEnter={handleProgressMouseEnter}
                onMouseLeave={handleProgressMouseLeave}
                type="range"
                name="progressBar"
                className={styles.progressBar}
                ref={progressRef}
                onChange={updateSongProgress}
                />
                <h6 className={styles.duration}>{songDuration}</h6>
            </div>
          </div>
        </section>
        <section className={styles.otherNavs}>
          <div className={styles.sidePlayerBtn} onClick={flagFunc} style={!minInfoFlag?{border:"solid #1FDF64 2px", opacity:"1"}:null}>
            <Image src={minInfoFlag?"/playButtonSharp.svg":"/playButtonSharpGreen.svg"} height={minInfoFlag?10:7} width={minInfoFlag?10:7} style={minInfoFlag&&{ filter: "invert(100%)" }}/>
            {!minInfoFlag&&<div className={styles.circle}></div>}
          </div>
        </section>
      </section>
    </>
  );
}