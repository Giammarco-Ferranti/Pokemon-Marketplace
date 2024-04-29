import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../assets/15.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));

  return (
    <div className="z-10 flex flex-row w-full justify-between h-10 items-center">
      <div
        onClick={() => navigate("/")}
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <img src={pokemonSvg} alt="pokemon-logo" className="w-20" />
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Input type={"text"} placeholder="Search" />

        {token ? (
          <Button
            onClick={() => navigate("/profile")}
            className="text-current bg-transparent hover:bg-gray-100 rounded-xl p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
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
  );
};

export default NavbarLayout;
