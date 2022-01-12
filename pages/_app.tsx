import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Head from "next/head";
import styles from "../styles/Home.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nasa List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Discover the cosmos!</h1>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
