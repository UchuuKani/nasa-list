import { DisplayList } from "../utils/types";

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

export default ViewButtonsContainer;
