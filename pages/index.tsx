import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useState } from "react";
import { DisplayList } from "../src/utils/types";

// components
import ListContainer from "../src/components/ListContainer";
import LikesContainer from "../src/components/LikesContainer";
import ViewButtonsContainer from "../src/components/ViewButtonsContainer";

const App: NextPage = () => {
  const [listView, setListView] = useState<DisplayList>("NONE");

  const setLikesView = () => {
    setListView("LIKES");
  };

  const setRandomView = () => {
    setListView("RANDOM");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Nasa List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Discover the cosmos!</h1>
        <ViewButtonsContainer
          viewStatus={listView}
          likesSetter={setLikesView}
          randomSetter={setRandomView}
        />
        {listView === "LIKES" && <LikesContainer />}
        {listView === "RANDOM" && <ListContainer />}
      </main>
    </div>
  );
};

export default App;
