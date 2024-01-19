import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmedPassword] = useState(null);
  const [errors, setErrors] = useState({});
  const [wantToChangePassword, setWantToChangePassword] = useState(false);

  const getProfileData = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const response = await fetch("https://ecommercebackend-bp4d.onrender.com/user/getUserData", {
        method: "GET",
        credentials: "include",
        headers: {
          "auth-token": `${token}`,
        },
      });
      if (response.ok) {
        const { result } = await response.json();
        setUserData(result);
      }
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  function validation()
  {
    let errorList = {};
    if (!userData.name || !userData.name.trim()) {
      errorList.name = "Invalid name";
    }
    if (!userData.email || !userData.email.trim()) {
      errorList.email = "Invalid email";
    }
    if(wantToChangePassword)
    {
      if (!password || !password.trim()) {
        errorList.password = "Invalid password";
      } else if (password !== confirmPassword) {
        errorList.password = "Password does not match";
      }
      if (!confirmPassword || !confirmPassword.trim()) {
        errorList.confirmPassword = "Invalid password";
      } else if (password !== confirmPassword) {
        errorList.confirmPassword = "Password does not match";
      }
    }

    setErrors(errorList);
    return Object.keys(errorList).length === 0;
  };

  const updateUserData = async (e) => {

    e.preventDefault();
    try {
      if (validation()) {
        const formData = new FormData();
        const {name, email} = userData;
        formData.append("name", name);
        formData.append("email", email);
        if(wantToChangePassword)
        {
          formData.append("password", password);
        }
        const token = localStorage.getItem('auth-token');
        const response = await fetch(
          "https://ecommercebackend-bp4d.onrender.com/user/updateUserData",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "auth-token": `${token}`,
            },
            body:formData
          }
        );
        if (!response.ok) {
          toast.error("Server error, please try again.");
        } else {
          toast.success("Profile updated successfully", {
            autoClose: 2000,
          });
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Server error, please try again.");
    }
  };

  const { name, email } = userData;
  return (
    <div className="bg-gray-100 pb-[2rem]">
      <div className="flex flex-col mb-[3rem] items-center">
        <h1 className="font-semibold text-[2rem]">Account Settings</h1>
        <p className="text-gray-400">Set your profile data</p>
      </div>
      <div className="flex flex-col items-center gap-3 justify-center">
        <div className="p-[2rem] bg-white w-fit rounded-lg">
          <Card color="transparent" shadow={false}>
            <form onSubmit={updateUserData} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <div className="relative">
                  <Input
                    value={name}
                    size="lg"
                    placeholder="name@mail.com"
                    className= {errors.name ? "border-red-900 focus:outline-none" : "border-gray-900 focus:outline-none" }
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                 {errors.name ? <div><ErrorIcon className="absolute top-[25%] right-[-24px] text-red-400"/></div> : <></>}
                </div>
                
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <div className="relative">
                  <Input
                    value={email}
                    type="email"
                    size="lg"
                    placeholder="name@mail.com"
                    className= {errors.email ? "border-red-900 focus:outline-none" : "border-gray-900 focus:outline-none" }
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                  {errors.email ? <div><ErrorIcon className="absolute top-[25%] right-[-24px] text-red-400"/></div> : <></>}
                </div>
                {
                  wantToChangePassword ? 
                  <>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                  New Password
                </Typography>
                <div className="relative">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    size="lg"
                    placeholder="********"
                    className= {errors.password ? "border-red-900 focus:outline-none" : "border-gray-900 focus:outline-none" }
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.password ? <div title= {errors.password}><ErrorIcon className="absolute top-[25%] right-[-24px] text-red-400"/></div> : <></>}
                </div>
                
                
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Confirm New Password
                  </Typography>
                  <div className="relative">
                    <Input
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                      type="password"
                      size="lg"
                      placeholder="********"
                      className= {errors.confirmPassword ? "border-red-900 focus:outline-none" : "border-gray-900 focus:outline-none" }
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.confirmPassword ? <div><ErrorIcon className="absolute top-[25%] right-[-24px] text-red-400"/></div> : <></>}
                </div>
                  </>
                  :
                  <button
                    onClick={() => setWantToChangePassword(true)}
                    className="cursor-pointer mb-3 text-blue-500 underline py-2 w-fit focus:outline-none"
                  >
                    Change Password
                  </button>                 
                } 
                {
                  wantToChangePassword ? 
                  <button
                    onClick={() => setWantToChangePassword(false)}
                    className="cursor-pointer mb-3 text-blue-500 underline py-2 w-fit focus:outline-none"
                  >
                    Keep the old Password
                  </button> 
                  :
                  <></>
                }
              </div>
              <Button
                type="submit"
                className="mt-6 hover:scale-105 hover:bg-orange-200 text-black mx-auto bg-orange-300 w-fit px-5"
                fullWidth
              >
                Update Profile data
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
