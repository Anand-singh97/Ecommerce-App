import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Popular = () => {
  const [popularInWomen, setPopularInWomen] = useState([]);

  useEffect(() => {
    const fetchPopularInWomen = async () => {
      try {
        const response = await fetch(
          "https://ecommercebackend-bp4d.onrender.com/product/popularInWomen",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const { result } = await response.json();
          setPopularInWomen(result);
        } else {
          toast.error("Unexpected Error Ocurred, Please try again.", {
            autoClose: 3000,
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("Unexpected Error Ocurred, Please try again.", {
          autoClose: 3000,
          position: "top-center",
        });
      }
    };

    fetchPopularInWomen();
  }, []);

  return (
    <div className="mb-[5rem]">
      <div className="flex justify-center mb-4">
        <h1 className="mb-1 text-xl font-bold border-b-[3px] border-black w-fit text-center mt-5">
          POPULAR IN WOMEN
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4">
        {popularInWomen.map((item) => {
          return <Item key={item.productId} item={item} />;
        })}
      </div>
      <ToastContainer
        position="top-center"
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
export default Popular;
