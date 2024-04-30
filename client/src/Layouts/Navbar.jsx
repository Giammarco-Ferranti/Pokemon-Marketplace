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
    <div className="z-10 flex flex-row justify-between items-center w-full max-w-screen-xl h-fit bg-white py-4 px-4 border border-gray-100 rounded-full fixed bg-white/20 backdrop-blur-md">
      <div
        onClick={() => navigate("/")}
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <img src={pokemonSvg} alt="pokemon-logo" className="w-10" />
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Input type={"text"} placeholder="Search Cards" />

        {token ? (
          <Button
            onClick={() => navigate("/profile")}
            className="text-current bg-transparent hover:bg-gray-100 rounded-2xl p-2"
          >
            <img src={avatar} alt="avatar-img" className="w-12 rounded-full" />
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
