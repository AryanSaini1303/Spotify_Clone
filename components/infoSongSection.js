import styles from "./infoSongSection.module.css"
export default function InfoSongSection(){
    return(
        <div className={styles.songCard}>
            <img src="/demoImage.jpeg" alt="" />
            <div className={styles.songInfo}>
                <h2>TEETH</h2>
                <h5>Wesghost</h5>
            </div>
        </div>
    )
}