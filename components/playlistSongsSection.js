import styles from "./playlistSongsSection.module.css"
import PlaylistNavs from "./playlistNavs";

export default function PlaylistSongsSection(){
    return (
        <section className={styles.container}>
            <PlaylistNavs/>
        </section>
    )
}