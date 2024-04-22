import { Input } from "@/components/ui/input";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-96 mt-20 flex flex-row gap-20 items-center justify-center">
      <div className="">
        <h1 className="text-xl font-semibold">Newsletter</h1>
        <Input type="email" placeholder="Email" />
      </div>
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
  );
};

export default Footer;
