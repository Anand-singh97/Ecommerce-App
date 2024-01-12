import React, { useState } from "react";
import { Link } from "react-router-dom";
import Review from "../Review/Review";

const Descriptionbox = () => {
  const [descriptionOrReview, setDescriptionOrReview] = useState("description");

  return (
    <div className="mx-3 mb-5">
      <div className="flex items-center ">
        <button
          onClick={() => setDescriptionOrReview("description")}
          className={
            descriptionOrReview === "description"
              ? "border-[1px] bg-gray-100 p-5"
              : "border-[1px] p-5"
          }
        >
          Description
        </button>
        <button
          onClick={() => setDescriptionOrReview("review")}
          className={
            descriptionOrReview !== "description"
              ? "border-[1px] bg-gray-100 p-5"
              : "border-[1px] p-5"
          }
        >
          Reviews(122)
        </button>
      </div>
      {descriptionOrReview === "description" ? (
        <div className="border-[1px] p-5 flex flex-col gap-3">
          <p>
            Introducing our standout clothing piece – a true embodiment of style
            and sophistication. Crafted with precision and attention to detail,
            this exquisite garment seamlessly combines fashion-forward design
            with unparalleled comfort. This piece features a material that not only feels luxurious against the skin but
            also showcases remarkable durability for enduring wear. 
            <br/><br/>
            The
            meticulous tailoring ensures a flattering fit, accentuating your
            silhouette with every wear. Adorned with variety of special features, this garment adds a touch of modern elegance to its
            timeless design. Whether you're dressing up for a special occasion
            or looking to make a statement in your everyday wardrobe, this
            versatile piece effortlessly rises to the occasion.
          </p>
          <div className="text-center rounded-full mx-auto py-2 px-5 bg-gray-200 w-fit">EXPAND</div>
        </div>
      ) : (
        <div className="border-[1px] p-5 flex flex-col gap-3">
          <Review
            comment="Great Product!! Will definitely buy it again."
            userName="John"
          />
          <Review
            comment="Fantastic purchase! Highly impressed with the quality. Will be a repeat customer for sure."
            userName="Bella"
          />
          <Review
            comment="Remarkable product! I see myself becoming a loyal customer."
            userName="Richard"
          />
          <Review
            comment="Not particularly impressed, to be honest."
            userName="Selena"
          />
          <div className="text-center rounded-full mx-auto py-2 px-5 bg-gray-200 w-fit">SHOW MORE</div>
        </div>
      )}
    </div>
  );
};

export default Descriptionbox;
