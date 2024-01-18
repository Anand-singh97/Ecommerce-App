import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross_icon from "../assets/cross_icon.png";
import nothing from "../assets/nothing.png";
import { Triangle } from "react-loader-spinner";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const handleClickOpen = (productId, name) => {
    setSelectedProductId(productId);
    setSelectedName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAllProducts = async () => {
    let processingToast;
    try {
      // processingToast = toast.info("😊 Fetching data. Please wait...", {
      //   autoClose: false,
      // });

      const response = await fetch(
        "https://ecommercebackend-bp4d.onrender.com/product/allProducts",
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
  const removeFromCart = async () => {
    try {
      const response = await fetch(
        "https://ecommercebackend-bp4d.onrender.com/product/removeProduct",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedProductId, name: selectedName }),
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
    handleClose();
  };

  return (
    <div className="bg-white items-center flex flex-col border-2 h-[30rem] md:h-[30rem] lg:h-[40rem] overflow-scroll rounded-lg p-1 mx-4 md:p-8">
      <div className="my-[1rem] mb-[3rem]">
        <div className="flex justify-center mb-4">
          <h1 className=" text-[1.5rem] font-[500] border-b-[1px] border-black">
            Product List
          </h1>
        </div>

        <div className="mx-3">
          <div className="flex justify-center">
            {loading ? (
              <div className="my-8">
                render(
                <Triangle
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                )
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
                      <th className="px-1 py-2 text-center">Edit</th>
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
                            onClick={()=>handleClickOpen(productId, name)}
                              className="w-3 cursor-pointer mx-auto"
                              src={cross_icon}
                              alt="remove icon"
                            />
                          </td>
                          <td className="px-4">
                            <Link to={`/editProduct/${productId}`}>
                              <EditIcon className="cursor-pointer scale-[0.8]" />
                            </Link>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{fontWeight:'500'}} id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={removeFromCart} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListProduct;
