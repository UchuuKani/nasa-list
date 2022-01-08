import React from "react";

interface CardProps {
  imgData: any;
}

const Card: React.FC<CardProps> = ({ imgData }) => {
  return <div>{imgData.title || "No description provided"}</div>;
};

export default Card;
