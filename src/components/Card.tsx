import React from "react";
import { ImageData } from "../utils/types";
import { LikeActions } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface CardProps extends LikeActions {
  imgData: ImageData;
  isLiked: boolean;
}

// choosing to use an <article> tag for the card container: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
const Card: React.FC<CardProps> = ({
  imgData,
  isLiked,
  likeImage,
  removeLike,
}) => {
  return (
    <article className="img-card">
      {/* not choosing a <figure> element to wrpa img tags bc a figure should relate to main content of a page. These images are the main content */}
      <div style={{ width: "100%" }}>
        {/* possible to have an image url returned, display the image (imgData.media_type === "image") */}
        {imgData.url && imgData.media_type === "image" && (
          <img
            src={imgData.url}
            alt={imgData.explanation || imgData.title || ""}
            style={{
              width: "100%",
            }}
          />
        )}
        {/* possible to have an video url returned, display the image (imgData.media_type === "video") */}
        {imgData.url && imgData.media_type === "video" && (
          <embed src={imgData.url} style={{ width: "100%", height: "100%" }} />
        )}
        {/* possbile to not have a url returned at all, display a placeholder or message saying no image available */}
        {!imgData.url && (
          <div style={{ width: "100%", height: "100%" }}>
            No image available
          </div>
        )}
      </div>
      <h2>{imgData.title || `A nice space ${imgData.media_type}`}</h2>
      <p>{imgData.date || ""}</p>
      {imgData.copyright && <p>Copyright: {imgData.copyright}</p>}
      <button
        aria-label="like"
        style={{
          color: isLiked ? "red" : "grey",
        }}
        className="like-btn"
        onClick={() => {
          if (isLiked) {
            removeLike(imgData.date);
            return;
          }
          likeImage(imgData.date);
        }}
      >
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </button>
    </article>
  );
};

export default Card;
