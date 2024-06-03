import styles from "./loading.module.css";
export default function loadingPage(){
    return(
        <div className={styles.container}>
            <div className={`${styles.circle1} ${styles.circle}`}></div>
            <div className={`${styles.circle2} ${styles.circle}`}></div>
            <div className={`${styles.circle3} ${styles.circle}`}></div>
        </div>
    )
}