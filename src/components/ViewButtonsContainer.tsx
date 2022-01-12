import { DisplayList } from "../utils/types";
import PropTypes from "prop-types";

interface ViewButtonContainerProps {
  randomSetter: () => void;
  likesSetter: () => void;
  viewStatus: DisplayList;
}

const ViewButtonsContainer: React.FC<ViewButtonContainerProps> = ({
  viewStatus,
  likesSetter,
  randomSetter,
}) => {
  return (
    <div className="view-btn-container">
      {viewStatus === "NONE" && (
        <>
          <button className="view-btn" onClick={randomSetter}>
            See 10 random images!
          </button>
          OR
          <button className="view-btn" onClick={likesSetter}>
            See your likes!
          </button>
        </>
      )}
      {viewStatus === "RANDOM" && (
        <button className="view-btn" onClick={likesSetter}>
          See your likes!
        </button>
      )}
      {viewStatus === "LIKES" && (
        <button className="view-btn" onClick={randomSetter}>
          See 10 random images!
        </button>
      )}
    </div>
  );
};

ViewButtonsContainer.propTypes = {
  viewStatus: PropTypes.oneOf<DisplayList>(["LIKES", "RANDOM", "NONE"])
    .isRequired,
  likesSetter: PropTypes.func.isRequired,
  randomSetter: PropTypes.func.isRequired,
};

export default ViewButtonsContainer;
