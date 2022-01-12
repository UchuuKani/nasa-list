import type { NextPage } from "next";

// components
import ListContainer from "../src/components/ListContainer";
import NavButtonsContainer from "../src/components/NavButtonsContainer";

const App: NextPage = () => {
  return (
    <div>
      <NavButtonsContainer linkText="See Likes" path="/likes" />
      <ListContainer />
    </div>
  );
};

export default App;
