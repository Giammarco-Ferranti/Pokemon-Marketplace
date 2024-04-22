import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

const Hero = () => {
  return (
    <div className="flex flex-row w-full h-[600px] justify-center items-center bg-[#fff2b2] rounded-xl mt-5">
      <div className="w-fit px-8 flex flex-col items-center justify-center h-fit">
        <h1 className="text-4xl font-bold">Gotta Catch 'Em All.</h1>
        <p className="text-base font-medium w-80 text-center">
          Welcome in the world largest pokemon marketplace.
        </p>
        <Button>Explore</Button>
      </div>
    </div>
  );
};

export default Hero;
