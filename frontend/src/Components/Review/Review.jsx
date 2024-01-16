import React from "react";

const Review = (props) => {
  const { userName, comment, date } = props;
  const parsedDate = new Date(date);
  const formattedDate = parsedDate.toISOString().split('T')[0];
  return (
    <div className="p-3">
      <div className="flex items-center gap-3">
        <p className="bg-gray-300 w-[2rem] h-[2rem] rounded-full"></p>
        <div className="flex items-center justify-center gap-3">
            <p className="italic font-semibold">{userName}</p>
            <div className=" text-gray-500">
              ({formattedDate})
            </div>
            {/* <div className="flex">
                <img src={starIcon} alt=""/>
                <img src={starIcon} alt=""/>
                <img src={starIcon} alt=""/>
                <img src={starIcon} alt=""/>
                <img src={starDullIcon} alt=""/>
            </div> */}
        </div>
        
      </div>
      <div className="ml-11">
        <p>{comment}</p>
      </div>
    </div>
    
  );
};

export default Review;
