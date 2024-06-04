import { useEffect, useState } from "react";
import styles from "./libPlaylistSection.module.css";
import Link from "next/link";

export default function LibPlaylistSection({ minimize,playlistPosters}) {

  const [num,setNum]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch("/api/getNumSongsPlaylist");
        if(!response.ok){
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data=await response.json();
        setNum(data);
      }catch(err){
        console.error("Error fetching playlists:",err);
      }
    };
    fetchData();
  },[]);

  const [playlists,setPlaylists]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch("/api/getPlaylists");
        if(!response.ok){
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data=await response.json();
        setPlaylists(data);
      }catch(err){
        console.error("Error fetching playlists:",err);
      }
    };
    fetchData();
  },[]);

  return (
    <div className={styles.container} style={minimize ? { margin: "0 auto"} : null} >
      {playlists.map((playlist,index) => {
        return (
          <Link href={`/playlist/${playlist.id}`} className={styles.playlist} key={playlist.id}>
            <img src={playlistPosters[index]} alt="" />
            {!minimize && (
              <div className={styles.playlistInfo}>
                <h4 className="Name">{playlist.name}</h4>
                <h5 className="otherInfo">
                  Playlist | <span>{num[index]} Songs</span>
                </h5>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
