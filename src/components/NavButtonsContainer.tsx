import Link from "next/link";
import PropTypes from "prop-types";

const NavButton: React.FC<{ linkText: string; path: string }> = ({
  linkText,
  path,
}) => {
  return (
    <Link href={path}>
      <a
        className="nav-link-btn"
        id={path === "/" ? "return-to-feed" : undefined}
      >
        {linkText}
      </a>
    </Link>
  );
};

NavButton.propTypes = {
  linkText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const NavButtonsContainer: React.FC = () => {
  return (
    <div className="view-btn-container">
      <NavButton linkText="Feed" path="/" />
      <NavButton linkText="Likes" path="/likes" />
    </div>
  );
};

export default NavButtonsContainer;
