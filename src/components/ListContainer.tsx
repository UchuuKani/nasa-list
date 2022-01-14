import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import useLocalStorage from "../hooks/useLocalStorage";
import { ImageData } from "../utils/types";
import { nasaKey } from "../utils/helpers";

import LoadingSpinner from "./LoadingSpinner";

const ListContainer: React.FC = () => {
  const [nasaImages, setNasaImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  // useLocalStorage for maintaining likes in state, and also persisting in localStorage when an image is liked or unliked
  const {
    storedLikes,
    addLike: addToLikeList,
    removeLike: removeFromLikeList,
  } = useLocalStorage();
  // can set state for loading, and error states - would maybe want to avoid if possible since don't want to work with tons of booleans
  // to derive state, and maybe opt to use a state machine like XState. For simple use case, opting to just use useState to handle

  const fetchNasa = async () => {
    setFetchError("");
    setIsLoading(true);
    try {
      let data = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&count=10`
      )
        .then(async (res) => {
          if (res.ok) {
            // believe the api does not do this, but might be the case that a 200 response is sent even if an error is sent back for a 40X error
            // may want to further check that response is ok, and that an "error" field does not exist in the response
            return res.json();
          }
          const errorMessage = await res.text();

          return Promise.reject(new Error(errorMessage));
        })
        .finally(() => {
          // regardless of whether or not request errors or not, want to set loading state to false
          setIsLoading(false);
        });

      console.log("we have data houston", data);
      // want to support this later to show that localStorage store works without adding the date range picker functionality
      // if we fetch from api and only provide key, latest image is fetched. The latest image object has the same shape
      // as an individual element of the array returned by api call if we supplied it a "count" parameter
      if (!Array.isArray(data)) data = [data];
      setNasaImages(data);
    } catch (err) {
      console.error(err);
      // going to use a hard coded error message
      setFetchError("There was an error while loading space stuff");
    }
  };

  useEffect(() => {
    fetchNasa();
  }, []);

  return (
    <>
      {/* if there is an error loading images, do not display list
        do display button to attempt to refetch */}
      {fetchError && (
        <figure className="fetch-error-container">
          {fetchError}
          <button className="retry-btn" onClick={fetchNasa}>
            Try again
          </button>
        </figure>
      )}
      {!fetchError && nasaImages.length > 0 && (
        <CardList
          imgDataList={nasaImages}
          likeImage={addToLikeList}
          removeLike={removeFromLikeList}
          likedImages={storedLikes}
        />
      )}
      {/* display loading screen if data has not returned, and if there is no error - can 
          be sure that isLoading is false after fetch completes due to .finally block -
          should not need to check that nasaImages.length === 0   
      */}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ListContainer;
