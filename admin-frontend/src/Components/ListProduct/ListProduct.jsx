import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross_icon from "../assets/cross_icon.png";
import nothing from "../assets/nothing.png";
import { Triangle } from "react-loader-spinner";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    let processingToast;
    try {
      // processingToast = toast.info("😊 Fetching data. Please wait...", {
      //   autoClose: false,
      // });

      const response = await fetch(
        "http://localhost:4000/product/allProducts",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const { result } = await response.json();
        setAllProducts(result);
        // toast.update(processingToast, {
        //   render: "Success",
        //   type: toast.TYPE.SUCCESS,
        //   autoClose: 3000,
        // });
      } else {
        toast.update(processingToast, {
          render: "Error, fetching product list. Please try again.",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.update(processingToast, {
        render: "An unexpected error occurred. Please try again.",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Assuming removeFromCart is a function that you need to define
  const removeFromCart = async (productId, name) => {
    try {
      const response = await fetch(
        "http://localhost:4000/product/removeProduct",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId, name: name }),
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Product successfully removed.", {
          autoClose: 3000,
        });
        await fetchAllProducts();
      } else {
        toast.error("Error removing product. Please try again", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white items-center flex flex-col border-2 h-[30rem] md:h-[30rem] lg:h-[40rem] overflow-scroll rounded-lg p-1 mx-4 md:p-8">
      <div className="my-[1rem] mb-[3rem]">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold border-b-[3px] border-black w-fit text-center mt-5">
            PRODUCT LIST
          </h1>
        </div>

        <div className="mx-3">
          <div className="flex justify-center">
            {loading ? (
              <div className="my-8">
              render(<Triangle
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />)
              </div>
            ) : allProducts.length === 0 ? (
              <div className="flex justify-center">
                <img className=" w-[80%]" src={nothing} alt="empty cart" />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="table-auto">
                  <thead className="border-b-[1px] text-sm md:text-lg border-gray-300">
                    <tr>
                      <th className="table-cell px-0 py-2 text-center">
                        Products
                      </th>
                      <th className="hidden md:table-cell px-0 py-2 text-center">
                        Title
                      </th>
                      <th className="px-1 py-2 text-center">Old Price</th>
                      <th className="px-1 py-2 text-center">New Price</th>
                      <th className="px-1 py-2 text-center">Category</th>
                      <th className="px-1 py-2 text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((item) => {
                      const {
                        image,
                        name,
                        old_price,
                        new_price,
                        category,
                        productId,
                      } = item;
                      return (
                        <tr key={productId} className="text-center">
                          <td className="table-cell px-4 py-2">
                            <img
                              className="w-[8rem] md:w-[8rem] mx-auto"
                              alt="item img"
                              src={image.url}
                            />
                          </td>
                          <td className="hidden md:table-cell px-4 py-2">
                            {name}
                          </td>
                          <td className="px-4 py-2">${old_price}</td>
                          <td className="px-4 py-2">${new_price}</td>
                          <td className="px-4 py-2">{category}</td>
                          <td className="px-4 py-2">
                            <img
                              onClick={() => removeFromCart(productId, name)}
                              className="w-3 cursor-pointer mx-auto"
                              src={cross_icon}
                              alt="remove icon"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
    </div>
  );
};

export default ListProduct;
