import { useState } from "react";

const useLocalStorage = () => {
  const [storedLikes, setStoredLikes] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      // Get from local storage by key
      const imgLikes = window.localStorage.getItem("storedLikes");
      // Parse stored json or if none return initialValue
      const storedVal = imgLikes ? JSON.parse(imgLikes) : [];
      return storedVal;
    }
  });

  // calling addLike will instantiate the store in localStorage if it does not exist
  const addLike = (uniqKey: string) => {
    const likesList = [...storedLikes, uniqKey];

    setStoredLikes(likesList);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("storedLikes", JSON.stringify(likesList));
    }
  };

  const removeLike = (uniqKey: string) => {
    const likesList = storedLikes.filter((identifier) => {
      return identifier !== uniqKey;
    });

    setStoredLikes(likesList);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("storedLikes", JSON.stringify(likesList));
    }
  };

  return { storedLikes, addLike, removeLike };
};

export default useLocalStorage;
