import React from "react";
import * as S from "./Footer.classes.js";

const Footer = () => {
  return (
    <div className={S.footerWrapper}>
      <div className={S.footerWrapperContent}>
        <div>
          <h1 className={S.footerContentList}>Marketplace</h1>
          <ul>
            <li>Trending</li>
            <li>Latest</li>
            <li>Categories</li>
          </ul>
        </div>
        <div>
          <h1 className={S.footerContentList}>Company</h1>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Values</li>
          </ul>
        </div>
        <div>
          <h1 className={S.footerContentList}>You</h1>
          <ul>
            <li>Profile</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
