import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/Auth/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Profile.classes.js";

const Profile = () => {
  const username = useState(localStorage.getItem("user"));
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={S.profileWrapper}>
      <div>Hello, user</div>
      <div className={S.profileListWrapper}>
        <ul className={S.profileList}>
          <li
            onClick={() => navigate("/profile/orders")}
            className={S.prolieListItem}
          >
            Orders
          </li>
          <li
            className={S.prolieListItem}
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
