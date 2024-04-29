import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full justify-start items-center mt-10">
      <div>Hello, username</div>
      <div>
        <ul className="cursor-pointer">
          <li onClick={() => navigate("/orders")}>Orders</li>
          <li onClick={() => navigate("/listings")}>Listings</li>
        </ul>

        {token ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
