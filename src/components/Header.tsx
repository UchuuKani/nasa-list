import NavButtonsContainer from "./NavButtonsContainer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header>
      <Link href="/">
        <a>
          <FontAwesomeIcon
            className="home-icon-sm"
            icon={faRocket}
            style={{ color: "white" }}
            aria-labelledby="return-to-feed"
            size="3x"
          />
          <h1 aria-labelledby="return-to-feed">Explore the Cosmos!</h1>
        </a>
      </Link>
      <NavButtonsContainer />
    </header>
  );
};

export default Header;
