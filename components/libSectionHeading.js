import styles from "./libSectionHeading.module.css";
import Link from "next/link";
export default function LibSectionHeading({ onClick, minimize }) {
  return (
    <header className={styles.container} style={minimize?{margin:"0 auto"}:null}>
      <div className={styles.heading} onClick={onClick}>
        {!minimize ? (
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="2rem"
            width="2rem"
          >
            <path d="M64 480H48a32 32 0 01-32-32V112a32 32 0 0132-32h16a32 32 0 0132 32v336a32 32 0 01-32 32zM240 176a32 32 0 00-32-32h-64a32 32 0 00-32 32v28a4 4 0 004 4h120a4 4 0 004-4zM112 448a32 32 0 0032 32h64a32 32 0 0032-32v-30a2 2 0 00-2-2H114a2 2 0 00-2 2z" />
            <path d="M114 240 H238 A2 2 0 0 1 240 242 V382 A2 2 0 0 1 238 384 H114 A2 2 0 0 1 112 382 V242 A2 2 0 0 1 114 240 z" />
            <path d="M320 480h-32a32 32 0 01-32-32V64a32 32 0 0132-32h32a32 32 0 0132 32v384a32 32 0 01-32 32zM495.89 445.45l-32.23-340c-1.48-15.65-16.94-27-34.53-25.31l-31.85 3c-17.59 1.67-30.65 15.71-29.17 31.36l32.23 340c1.48 15.65 16.94 27 34.53 25.31l31.85-3c17.59-1.67 30.65-15.71 29.17-31.36z" />
          </svg>
        ) : (
          <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          height="2.15rem"
          width="2.15rem"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M48 96 H80 A16 16 0 0 1 96 112 V448 A16 16 0 0 1 80 464 H48 A16 16 0 0 1 32 448 V112 A16 16 0 0 1 48 96 z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M112 224h128M112 400h128"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M128 160 H224 A16 16 0 0 1 240 176 V448 A16 16 0 0 1 224 464 H128 A16 16 0 0 1 112 448 V176 A16 16 0 0 1 128 160 z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M272 48 H336 A16 16 0 0 1 352 64 V448 A16 16 0 0 1 336 464 H272 A16 16 0 0 1 256 448 V64 A16 16 0 0 1 272 48 z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M422.46 96.11l-40.4 4.25c-11.12 1.17-19.18 11.57-17.93 23.1l34.92 321.59c1.26 11.53 11.37 20 22.49 18.84l40.4-4.25c11.12-1.17 19.18-11.57 17.93-23.1L445 115c-1.31-11.58-11.42-20.06-22.54-18.89z"
          />
        </svg>
        )}
        {!minimize && <h4>Your Library</h4>}
      </div>
        {!minimize &&
          <div className={styles.addPlaylist}>
            <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.7em"
            width="1.7em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M256 112v288M400 256H112"
            />
          </svg>
      </div>
        }
    </header>
  );
}
