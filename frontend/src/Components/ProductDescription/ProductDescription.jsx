import React, { useState } from "react";
import Review from "../Review/Review";
import { useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDescription = ({ productId }) => {
  const [descriptionOrReview, setDescriptionOrReview] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    async function getReviews() {
      const response = await fetch(
        "https://ecommercebackend-bp4d.onrender.com/product/getReviews",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: productId }),
        }
      );
      if (response.ok) {
        const { result } = await response.json();
        setReviews(result);
      }
    }
    getReviews();
  }, [productId]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch(
          "https://ecommercebackend-bp4d.onrender.com/product/addReview",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({
              productId: productId,
              comment: currentReview,
            }),
          }
        );
        if (response.ok) {
          const response = await fetch(
            "https://ecommercebackend-bp4d.onrender.com/product/getReviews",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ productId: productId }),
            }
          );
          if (response.ok) {
            const { result } = await response.json();
            setReviews(result);
            setCurrentReview("");
          }
        } else {
          alert("Server Error");
        }
      } catch (error) {
        alert("Server Error");
      }
    } else {
      toast.info("You need to login to submit a review", {
        autoClose: 2500,
      });
    }
  };

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
          Reviews({reviews.length})
        </button>
      </div>
      {descriptionOrReview === "description" ? (
        <div className="border-[1px] p-5 flex flex-col gap-3">
          <p>
            Introducing our standout clothing piece – a true embodiment of style
            and sophistication. Crafted with precision and attention to detail,
            this exquisite garment seamlessly combines fashion-forward design
            with unparalleled comfort. This piece features a material that not
            only feels luxurious against the skin but also showcases remarkable
            durability for enduring wear.
            <br />
            <br />
            The meticulous tailoring ensures a flattering fit, accentuating your
            silhouette with every wear. Adorned with variety of special
            features, this garment adds a touch of modern elegance to its
            timeless design. Whether you're dressing up for a special occasion
            or looking to make a statement in your everyday wardrobe, this
            versatile piece effortlessly rises to the occasion.
          </p>
          <div className="text-center rounded-full mx-auto py-2 px-5 bg-gray-200 w-fit">
            EXPAND
          </div>
        </div>
      ) : (
        <div className="border-[1px] p-5 flex flex-col gap-3">
          {reviews.map((review) => {
            return (
              <div key={review.date}>
                <Review
                  comment={review.comment}
                  userName={review.userId.name}
                  date={review.date}
                />
              </div>
            );
          })}
          <div>
            <div>
              <form onSubmit={submitReview}>
                <div className="grid gap-6 mb-6 grid-cols-1">
                  <div className="">
                    <input
                      type="text"
                      id="quickReviewInput"
                      name="quickReviewInput"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-900 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Thumbs up or down?"
                      required
                      onChange={(e) => setCurrentReview(e.target.value)}
                      value={currentReview}
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center rounded-full mx-auto py-2 px-5 bg-gray-200 w-fit">
            SHOW MORE
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </div>
  );
};

export default ProductDescription;
