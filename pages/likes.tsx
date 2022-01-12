import type { NextPage } from "next";

// components
import LikesContainer from "../src/components/LikesContainer";
import NavButtonsContainer from "../src/components/NavButtonsContainer";

const Likes: NextPage = () => {
  return (
    <div>
      <NavButtonsContainer linkText="See feed" path="/" />
      <LikesContainer />
    </div>
  );
};

export default Likes;
