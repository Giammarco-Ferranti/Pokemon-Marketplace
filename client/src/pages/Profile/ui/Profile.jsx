import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/Auth/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Profile.classes.js";

const Profile = () => {
  const username = useState(JSON.parse(localStorage.getItem("user")));
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  console.log(username);
  return (
    <div className={S.profileWrapper}>
      <div className={S.profileTitle}>
        Hello{username ? `, ${username[0].username}` : null}
      </div>
      <div className={S.profileListWrapper}>
        <ul className={S.profileList}>
          <Button onClick={() => navigate("/profile/orders")} variant="outline">
            Orders
          </Button>
          <Button
            onClick={() => navigate("/profile/listings")}
            variant="outline"
          >
            Listings
          </Button>
        </ul>

        {token ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              setToken(null);
              navigate("/");
            }}
            className="w-fit"
            variant="destructive"
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
