import Link from "next/link";
import PropTypes from "prop-types";

const NavButton: React.FC<{ linkText: string; path: string }> = ({
  linkText,
  path,
}) => {
  return (
    <Link href={path}>
      <a className="nav-link-btn">{linkText}</a>
    </Link>
  );
};

NavButton.propTypes = {
  linkText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const ViewButtonsContainer: React.FC<{
  linkText: string;
  path: string;
}> = ({ linkText, path }) => {
  return (
    <div className="view-btn-container">
      <NavButton linkText={linkText} path={path} />
    </div>
  );
};

ViewButtonsContainer.propTypes = {
  linkText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default ViewButtonsContainer;
