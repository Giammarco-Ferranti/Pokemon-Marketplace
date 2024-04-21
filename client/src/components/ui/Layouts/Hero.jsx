import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroCard from "../HeroCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@nextui-org/react";
import patternImage from "../../../assets/12406503_4997689.jpg";
import { Card, CardContent } from "../card";

const Hero = ({ img }) => {
  if (!img) return <h1>Loading</h1>;

  return (
    <div
      style={{
        backgroundImage: `url(${patternImage})`,
        backgroundSize: "1000px",
      }}
      className={`relative flex flex-row justify-center items-center w-screen h-screen max-w-screen-xl max-h-[600px] p-[24px] rounded-2xl overflow-hidden`}
    >
      {/* <img
        src={patternImage}
        className=" w-full h-full object-cover rounded-xl"
      /> */}
      <div className="flex flex-row justify-center items-center absolute w-full h-full bg-white-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
        <div>
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {img.map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <img src={`http://localhost:5010/${_.name}`} />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
