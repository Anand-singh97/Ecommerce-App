import React from "react";
import footerLogo from "../Assets/logo_big.png";
import instagramIcon from "../Assets/instagram_icon.png";
import pinterestIcon from "../Assets/pintester_icon.png";
import whatsappIcon from "../Assets/whatsapp_icon.png";
const Footer = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-center justify-center">
        <img src={footerLogo} alt="footerLogo" />
        <p className=" text-3xl font-bold">SHOPPER</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5"> 
        <ul className="flex gap-4 justify-center">
          <li>Company</li>
          <li>Products</li>
          <li>Offices</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 justify-center items-center">
            <div className="p-1">
              <img src={instagramIcon} alt="insta icon" />
            </div>
            <div className="p-1">
              <img src={pinterestIcon} alt="pinterest icon" />
            </div>
            <div className="p-1">
              <img src={whatsappIcon} alt="whatsapp icon" />
            </div>
          </div>
          <div className="">
            <hr/>
            <p>Copyright @ 2024 - All Right Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
