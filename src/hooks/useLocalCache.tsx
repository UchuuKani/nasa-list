import { useState } from "react";

const useLocalCache = () => {
  const [cachedLikes, setCachedLikes] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      // Get from local storage by key
      const imgLikes = window.localStorage.getItem("cachedLikes");
      // Parse stored json or if none return initialValue
      const cacheVal = imgLikes ? JSON.parse(imgLikes) : [];
      return cacheVal;
    }
  });

  // calling addLike will instantiate the cache in localStorage if it does not exist
  const addLike = (uniqKey: string) => {
    const likesList = [...cachedLikes, uniqKey];

    setCachedLikes(likesList);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("cachedLikes", JSON.stringify(likesList));
    }
  };

  const removeLike = (uniqKey: string) => {
    const likesList = cachedLikes.filter((identifier) => {
      return identifier !== uniqKey;
    });

    setCachedLikes(likesList);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("cachedLikes", JSON.stringify(likesList));
    }
  };

  return { cachedLikes, addLike, removeLike };
};

export default useLocalCache;
