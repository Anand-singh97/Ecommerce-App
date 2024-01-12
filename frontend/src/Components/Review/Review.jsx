import React from "react";
import starIcon from "../Assets/star_icon.png";
import starDullIcon from "../Assets/star_dull_icon.png";

const Review = (props) => {
  const { userName, comment } = props;
  return (
    <div className="p-3">
      <div className="flex items-center gap-3">
        <p className="bg-gray-300 w-[2rem] h-[2rem] rounded-full"></p>
        <div className="flex items-center gap-3">
            <p className="italic font-semibold">{userName}</p>
            <div className="flex">
                <img src={starIcon} alt=""/>
                <img src={starIcon} alt=""/>
                <img src={starIcon} alt=""/>
                <img src={starIcon} alt=""/>
                <img src={starDullIcon} alt=""/>
            </div>
        </div>
        
      </div>
      <div className="ml-11">
        <p>{comment}</p>
      </div>
    </div>
    
  );
};

export default Review;
