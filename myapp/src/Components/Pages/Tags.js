import React from "react";
import TagsList from "./TagsList";
import "./Tags.css";
import '../User/user.css'
import { tagsList } from "./tagList";
import LeftSidebar from "../Layout/LeftSidebar";

const Tags = () => {
  return (
    <>
     <LeftSidebar/>
    <div className="homeContainer_1">
       
      <div className="home-container-2">
        <h1 className="tags-h1" class="mt-28">Tags</h1>
        <p className="tags-p">
          A tag is a keyword or label that categorizes your question with other,
          similar questions.
        </p>
        <p className="tags-p">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className="tags-list-container">
          {tagsList.map((tag, index) => (
            <>
            
            <TagsList tag={tag} key={index} /></>
          ))}
        </div>
      </div>
    </div></>
  );
};

export default Tags;