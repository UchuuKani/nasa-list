import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <FontAwesomeIcon icon={faRocket} spin size="7x" />
      <FontAwesomeIcon icon={faRocket} spin size="7x" />
      <FontAwesomeIcon
        icon={faRocket}
        spin
        size="7x"
        className="extra-spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
