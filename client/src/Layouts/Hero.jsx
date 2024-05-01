import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import gif from "../assets/blastoise-mega.gif";

const Hero = () => {
  return (
    <div className="flex flex-row py-16 w-full h-fit sm:h-screen justify-center items-center rounded-3xl mt-5">
      <div className="w-full flex flex-col gap-10 items-center justify-center h-fit bg-[#FBF3D5] px-5 py-5 sm:py-20 rounded-2xl sm:flex-row  sm:gap-24 mx-4 xl:mx-0">
        <div className="bg-white p-10 rounded-xl">
          <img
            src={gif}
            className="w-96 h-96 aspect-square sm:w-60 sm:h-60 md:w-96 md:h-96 "
            alt="hero-gif"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-3  text-center sm:items-start sm:text-left">
          <h3 className="text-4xl font-bold">Gotta catch 'em all.</h3>
          <p className="font-semibold text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <Button className="rounded-3xl">Explore</Button>
        </div>
        {/* <h1 className="text-4xl font-bold">Gotta Catch 'Em All.</h1>
        <p className="text-base font-medium w-80 text-center">
          Welcome in the world largest pokemon marketplace.
        </p>
        <Button variant={"link"} size={"default"}>
          Explore
        </Button> */}
      </div>
    </div>
  );
};

export default Hero;
