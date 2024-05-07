import { Input } from "@/components/ui/input";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-96 mt-10 flex justify-center px-2 py-2">
      <div className="flex flex-row items-center justify-around w-full max-w-screen-xl  border-orange-100 bg-orange-100 rounded-3xl">
        <div>
          <h1 className="text-base font-semibold">Marketplace</h1>
          <ul>
            <li>Trending</li>
            <li>Latest</li>
            <li>Categories</li>
          </ul>
        </div>
        <div>
          <h1 className="text-base font-semibold">Company</h1>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Values</li>
          </ul>
        </div>
        <div>
          <h1 className="text-base font-semibold">You</h1>
          <ul>
            <li>Profile</li>
            <li>Orders</li>
            <li>Payments</li>
            <li>Transaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
