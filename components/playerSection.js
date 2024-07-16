import Image from "next/image";
import styles from "./playerSection.module.css";
import { useRef, useState, useEffect } from "react";

export default function PlayerSection({
  className,
  flagFunc,
  minInfoFlag,
  info,
  defaultSongRender,
  playStatus,
  songCurrentPlaylistId,
  playlistNavsPause,
  getPauseFromPlaylistNavs
}) {
  // console.log(songCurrentPlaylistId);
  const progressRef = useRef(null);
  const playPauseRef = useRef(null);
  const songRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [progressMouseEnter, setProgressMouseEnter] = useState(false);
  const [progressMouseLeave, setProgressMouseLeave] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (playlistNavsPause) {
      console.log("here");
      setPlay(false);
      songRef.current.pause();
      playStatus(songCurrentPlaylistId,false)
    }
  }, [playlistNavsPause]);
  useEffect(() => {
    if (songRef.current) {
      songRef.current.onloadedmetadata = () => {
        setSongDuration(
          `${Math.floor(songRef.current.duration / 60)}:${
            Math.round(songRef.current.duration % 60) < 10 ? "0" : ""
          }${Math.round(songRef.current.duration % 60)}`
        );
        progressRef.current.max = songRef.current.duration;
        progressRef.current.value = 0;
      };
      songRef.current.pause();
      songRef.current.load();
      songRef.current.play();
      if (!defaultSongRender) {
        // console.log("Here");
        setPlay(true);
      }
      if (!isFirstRender.current) {
        playStatus(songCurrentPlaylistId, true);
      } else {
        isFirstRender.current = false;
      }
      // In above code, if the component is first rendered then it does not execute the function, which means now whenver the "info" changes i.e. when user clicks on the song, then the function will be exeucted
    }
  }, [info]);

  function updateProgressBar() {
    // setPlay(true);
    if (songRef.current && progressRef.current) {
      progressRef.current.value = songRef.current.currentTime;
      setSongCurrentTime(
        `${Math.floor(songRef.current.currentTime / 60)}:${
          Math.round(songRef.current.currentTime % 60) < 10 ? "0" : ""
        }${Math.round(songRef.current.currentTime % 60)}`
      );
      setProgressBarValue(
        (songRef.current.currentTime / songRef.current.duration) * 100
      );
    }
  }

  function resetProgressBar() {
    if (progressRef.current) {
      progressRef.current.value = 0;
      setPlay(false);
      setProgressBarValue(0);
      songRef.current.currentTime = 0;
      playStatus();
    }
  }

  function updateSongProgress() {
    if (songRef.current) {
      songRef.current.currentTime = progressRef.current.value;
    }
  }

  function handlePlayClick() {
    getPauseFromPlaylistNavs(false)
    playStatus();
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

  function handleProgressMouseEnter() {
    setProgressMouseEnter(true);
    setProgressMouseLeave(false);
  }

  function handleProgressMouseLeave() {
    setProgressMouseEnter(false);
    setProgressMouseLeave(true);
  }

  let backgroundColor;
  if (progressMouseEnter) {
    backgroundColor = "#1FDF64";
  }
  if (progressMouseLeave) {
    backgroundColor = "white";
  }
  const overlayStyle = {
    width: `${progressBarValue}%`,
    backgroundColor,
  };

  return (
    info && (
      <>
        <section className={className}>
          <section className={styles.songCard}>
            <img src={info.poster} alt="Song's Poster" />
            <div className={styles.songDetails}>
              <h5>{info.title}</h5>
              <h6>{info.artist}</h6>
            </div>
            <div className={styles.add}>
              <img src="/add.svg" alt="Add Button" />
            </div>
          </section>
          <section className={styles.player}>
            <audio
              key={`/songs/${info.title}.mp3`}
              ref={songRef}
              onTimeUpdate={updateProgressBar}
              onEnded={resetProgressBar}
            >
              <source src={`/songs/${info.title}.mp3`} type="audio/mpeg" />
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
                onClick={() => {
                  handlePlayClick(info.id);
                }}
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
                <h6 className={styles.currentTime}>
                  {songCurrentTime === 0 ? "0:00" : songCurrentTime}
                </h6>
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
            <div
              className={styles.sidePlayerBtn}
              onClick={flagFunc}
              style={
                !minInfoFlag
                  ? { border: "solid #1FDF64 2px", opacity: "1" }
                  : null
              }
            >
              <Image
                src={
                  minInfoFlag
                    ? "/playButtonSharp.svg"
                    : "/playButtonSharpGreen.svg"
                }
                height={minInfoFlag ? 10 : 6.5}
                width={minInfoFlag ? 10 : 6.5}
                style={minInfoFlag && { filter: "invert(100%)" }}
              />
              {!minInfoFlag && <div className={styles.circle}></div>}
            </div>
          </section>
        </section>
      </>
    )
  );
}
