import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import useLocalCache from "../hooks/useLocalCache";

interface ListContainerProps {
  test: number;
}

const ListContainer: React.FC<ListContainerProps> = ({ test }) => {
  const [nasaImages, setNasaImages] = useState<any[]>([]);
  // useLocalCache for maintaining likes in state, and also persisting in localStorage when an image is liked or unliked
  const {
    cachedLikes,
    addLike: addToLikeList,
    removeLike: removeFromLikeList,
  } = useLocalCache();
  const nasaKey = process.env.NEXT_PUBLIC_NASA_KEY;

  const fetchNasa = async () => {
    try {
      const data = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&count=10`
      ).then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Error fetching images");
      });

      console.log("we have data houston", data);
      setNasaImages(data);
    } catch (err) {
      console.log("Error fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNasa();
  }, [fetchNasa]);

  return (
    <div>
      <CardList imgDataList={nasaImages} />
    </div>
  );
};

export default ListContainer;
