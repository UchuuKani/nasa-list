import React from "react";
import Card from "./Card";
import { LikesStore, LikeActions, ImageData } from "../utils/types";

interface CardListProps extends LikeActions {
  imgDataList: ImageData[];
  likedImages: LikesStore;
}

const CardList: React.FC<CardListProps> = ({
  imgDataList,
  likeImage,
  removeLike,
  likedImages,
}) => {
  return (
    <ul>
      {imgDataList?.map((imgData) => {
        // assume dates are unique for each image and can be used as a key when mapping
        // NOTE: when testing the api, noted that it was possible for a url and hdurl to be missing, so
        // prefer to use "date" as unique key (assume "date" should always exist for a "picture of the day")

        // prefer to pass in the like status for each card, rather than the whole store of likes and determining in the Card if the image is Liked
        // so pass in some prop like "likeStatus"
        return (
          <li key={imgData.date}>
            <Card
              imgData={imgData}
              isLiked={likedImages.includes(imgData.date)}
              likeImage={likeImage}
              removeLike={removeLike}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
