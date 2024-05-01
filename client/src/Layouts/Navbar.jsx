import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../assets/15.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));

  return (
    <div className="z-10 flex flex-row justify-center items-center w-full h-fit bg-white border-b  fixed top-0 py-2 px-2 bg-white/40 backdrop-blur-lg">
      <div className="flex flex-row justify-between items-center w-full max-w-screen-xl">
        <div className="flex flex-row gap-4 items-center justify-center cursor-pointer font-medium text-sm">
          <img
            onClick={() => navigate("/")}
            src={pokemonSvg}
            alt="pokemon-logo"
            className="w-10"
          />
          <h3
            onClick={() => navigate("/explore")}
            className="hover:opacity-50 transition-all"
          >
            Explore
          </h3>
          <h3
            onClick={() => navigate("/users")}
            className="hover:opacity-50 transition-all"
          >
            Users
          </h3>
        </div>
        <div className="flex flex-row gap-5 items-center">
          <Input
            type={"text"}
            placeholder="Search Cards"
            className="bg-white border-gray-200 border"
          />

          {token ? (
            <Button
              onClick={() => navigate("/profile")}
              className="text-current bg-transparent hover:bg-gray-100 rounded-2xl p-2"
            >
              <img
                src={avatar}
                alt="avatar-img"
                className="w-10 rounded-full"
              />
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
          {/* {token ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
