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
        {/* possbile to not have a url returned at all, display a placeholder or message saying no image available - using a free stock photo */}
        {!imgData.url && (
          <img
            src={
              "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            alt=""
            style={{
              width: "100%",
            }}
          />
        )}
      </div>
      <h2>{imgData.title || `A nice space ${imgData.media_type}`}</h2>
      {/* only display date if it is available - safe to assume a date would always come back in the request for each image? */}
      {imgData.date && <p>{imgData.date}</p>}
      {/* "Details" element to have the option to see image's explanation */}
      <details className="expando-container">
        <summary>Details</summary>
        {/* display copyright info if available */}
        {imgData.copyright && (
          <p className="copyright">
            Copyright: <br /> {imgData.copyright}
          </p>
        )}
        <p className="explanation">{imgData.explanation}</p>
      </details>
      {/* like button using font awesome */}
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
