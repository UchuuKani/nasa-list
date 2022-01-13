import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import CardList from "./CardList";
import useLocalStorage from "../hooks/useLocalStorage";
import { ImageData } from "../utils/types";
import { nasaKey, mapFailedResponseToDate } from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

const LikesContainer: React.FC = () => {
  const [nasaImages, setNasaImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedDates, setFailedDates] = useState<string[]>([]);
  // useLocalStorage for maintaining likes in state, and also persisting in localStorage when an image is liked or unliked
  const {
    storedLikes,
    addLike: addToLikeList,
    removeLike: removeFromLikeList,
  } = useLocalStorage();

  const fetchNasaLikes = async () => {
    setFailedDates([]);
    setIsLoading(true);

    // not strictly necessary to prevent fetch call if no storedLikes because network request is not made
    // when calling Promise.allSettled with an empty array
    try {
      const data = await Promise.allSettled<ImageData>(
        storedLikes.map((imgDate) => {
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
      // of api calls for every like in localStorage, but more so using this as a way to demonstrate
      // local store of likes works when page is reloaded
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
      const failedFetchDates = mapFailedResponseToDate(storedLikes, data);

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
    <>
      {/* display which liked images could not be loaded */}
      {failedDates.length > 0 && (
        <div className="failed-dates-container">
          <button className="retry-btn" onClick={fetchNasaLikes}>
            Try again
          </button>
          Failed to fetch images for dates:
          <ul>
            {failedDates?.map((date) => {
              return (
                <li key={date}>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ marginRight: 8, color: "rgb(255, 205, 60)" }}
                  />
                  {date}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* if no likes, indicate as such - prefer checking for presence of storedLikes instead of nasaLikes
          because nasaLikes will be empty and isLoading will be false on first render (nasaLikes could potentially be set to a non-empty array later)
          storedLikes should be empty and stay empty on first render, and on subsequent renders while
          this component is mounted
      */}
      {/* there is also the case that you un-like every like currently on the page - the cards
          will not be dismissed - in this case, do not display "no likes" message
      */}
      {storedLikes?.length === 0 && nasaImages.length === 0 && (
        <p className="no-likes-container">
          You don't have any likes. Check out some images by going to{" "}
          <FontAwesomeIcon
            aria-hidden={true}
            icon={faStar}
            style={{ color: "rgb(255, 205, 60)" }}
          />
          <Link href="/">your feed!</Link>
          <FontAwesomeIcon
            aria-hidden={true}
            icon={faStar}
            style={{ color: "rgb(255, 205, 60)" }}
          />
        </p>
      )}
      {/* otherwise, display user likes using localStorage values */}
      {nasaImages.length > 0 && (
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

export default LikesContainer;
