import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import useLocalCache from "../hooks/useLocalCache";
import { ImageData } from "../utils/types";
import { nasaKey, mapFailedResponseToDate } from "../utils/helpers";

const LikesContainer: React.FC = () => {
  const [nasaImages, setNasaImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedDates, setFailedDates] = useState<string[]>([]);
  // useLocalCache for maintaining likes in state, and also persisting in localStorage when an image is liked or unliked
  const {
    cachedLikes,
    addLike: addToLikeList,
    removeLike: removeFromLikeList,
  } = useLocalCache();

  const fetchNasaLikes = async () => {
    setFailedDates([]);
    setIsLoading(true);

    try {
      let data = await Promise.allSettled<ImageData>(
        cachedLikes.map((imgDate) => {
          return fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${imgDate}`
          ).then(async (res) => {
            if (res.ok) {
              return res.json();
            }
            const errorMessage = await res.text();

            return Promise.reject(new Error(errorMessage));
          });
        })
      );
      // this method for retriving likes probably would not scale well bc we are making X number
      // of api calls for every like in the cache, but more so using this as a way to demonstrate
      // local cache of likes works when page is reloaded
      const mappedData: any = data
        .map<ImageData | undefined>((likeObj) => {
          if (likeObj.status === "fulfilled") {
            return likeObj.value;
          }
          // if promise did not fulfill, it was rejected
        })
        .filter((likeObj) => {
          if (likeObj) return true;
          return false;
        });
      const failedFetchDates = mapFailedResponseToDate(cachedLikes, data);
      console.log("we have data houston", data);
      console.log("and also mappedData", mappedData);
      console.log(
        "also have mapping to dates which failed to fetch",
        failedDates
      );

      if (failedFetchDates.length > 0) {
        setFailedDates(failedFetchDates);
      }

      setNasaImages(mappedData);
    } catch (err) {
      // as all individual requests may fail, not setting state in catch block for anything
      console.error(err);
    } finally {
      // regardless of whether or not request errors or not, want to set loading state to false
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNasaLikes();
  }, []);

  return (
    <div>
      {/* display which liked images could not be loaded */}
      {failedDates.length > 0 && (
        <p className="failed-dates-container">
          Failed to fetch images for
          {failedDates.join()}
          <button onClick={fetchNasaLikes}>Try again</button>
        </p>
      )}
      {nasaImages.length > 0 && (
        <CardList
          imgDataList={nasaImages}
          likeImage={addToLikeList}
          removeLike={removeFromLikeList}
          likedImages={cachedLikes}
        />
      )}
      {/* display loading screen if data has not returned, and if there is no error - can
          be sure that isLoading is false after fetch completes due to .finally block -
          should not need to check that nasaImages.length === 0
      */}
      {isLoading && <div>Loading images</div>}
    </div>
  );
};

export default LikesContainer;
