import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../assets/15.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavbarLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="z-10 flex flex-row w-full justify-between h-10 items-center">
      <div className="flex flex-col items-center justify-center">
        <img src={pokemonSvg} alt="pokemon-logo" className="w-20" />
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Input type={"text"} placeholder="Search" />
        <Button onClick={() => navigate("/login")}>Login</Button>
        {localStorage.getItem("token") ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/dashboard");
            }}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default NavbarLayout;
