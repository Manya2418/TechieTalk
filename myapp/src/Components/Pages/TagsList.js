import React from "react";
import "./Tags.css";

const TagsList = ({ tag }) => {
  return (
    <div className="tag">
      <h1>{tag.tagName}</h1>
      <p>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;
