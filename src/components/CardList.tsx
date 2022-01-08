import React from "react";
import Card from "./Card";

interface CardListProps {
  imgDataList: any[];
}

const CardList: React.FC<CardListProps> = ({ imgDataList }) => {
  return (
    <ul>
      {imgDataList?.map((imgData) => {
        // assume urls are unique for each image and can be used as a key when mapping
        return <Card key={imgData.url} imgData={imgData} />;
      })}
    </ul>
  );
};

export default CardList;
