import React from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../assets/15.svg";
import { Button } from "@/components/ui/button";

const NavbarLayout = () => {
  return (
    <div className="z-10 flex flex-row w-full justify-between h-10 items-center">
      <div className="flex flex-col items-center justify-center">
        <img src={pokemonSvg} alt="pokemon-logo" className="w-20" />
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Input type={"text"} placeholder="Search" />
        <Button link>Login</Button>
      </div>
    </div>
  );
};

export default NavbarLayout;
