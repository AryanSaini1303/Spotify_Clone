'use client'
import PlayerSection from "@/components/playerSection";
import MainSection from "@/components/mainSection";
import InfoSection from "@/components/infoSection";
import NavSection from "@/components/navSection";
import LibSection from "@/components/libSection";
import { useState } from "react";

export default function HomePage() {
  const [minLib,setMinLib]=useState(false);
  function handleMinLib(){
    setMinLib(!minLib);
  }
  return (
    <>
      <div className={minLib?"minMainPageContainer":"mainPageContainer"}>
        <NavSection className="navSection" minimize={minLib}/>
        <LibSection className="libSection" onClick={handleMinLib} minimize={minLib}/>
        <PlayerSection className="playerSection"/>
        <MainSection className="mainSection"/>
        <InfoSection className="infoSection"/>
      </div>
    </>
  );
}
