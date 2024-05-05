import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/Auth/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const username = useState(localStorage.getItem("user"));
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-10">
      <div>Hello, user</div>
      <div className="flex flex-col justify-center items-center gap-10">
        <ul className="cursor-pointer flex flex-row gap-10">
          <li
            onClick={() => navigate("/profile/orders")}
            className="border py-2 px-4 rounded-2xl"
          >
            Orders
          </li>
          <li
            className="border py-2 px-4 rounded-2xl"
            onClick={() => navigate("/profile/listings")}
          >
            Listings
          </li>
        </ul>

        {token ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              setToken(null);
              navigate("/");
            }}
            className="w-fit"
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
