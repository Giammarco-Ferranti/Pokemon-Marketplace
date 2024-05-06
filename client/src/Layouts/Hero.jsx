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
    // <div className="relative isolate px-6 pt-14 md:pt-0 lg:px-8">
    //   <div
    //     className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    //     aria-hidden="true"
    //   >
    //     <div
    //       className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
    //       style={{
    //         clipPath:
    //           "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //       }}
    //     />
    //   </div>
    //   {/* <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    //     <div className="hidden sm:mb-8 sm:flex sm:justify-center">
    //       <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
    //         Announcing our next round of funding.{" "}
    //         <a href="#" className="font-semibold text-indigo-600">
    //           <span className="absolute inset-0" aria-hidden="true" />
    //           Read more <span aria-hidden="true">&rarr;</span>
    //         </a>
    //       </div>
    //     </div> */}
    //   {/* <div className="text-center"> */}
    //   <div className="flex flex-row py-16 w-full h-fit sm:h-screen justify-center items-center rounded-3xl mt-5">
    //     <div className="w-full flex flex-col gap-10 items-center justify-center h-fit bg-[#FBF3D5]/30 backdrop-blur-2xl border-2 border-gray-100/40 px-5 py-5 sm:py-20 rounded-2xl sm:flex-row  sm:gap-24 mx-4 xl:mx-0">
    //       <div className=" bg-white/80 backdrop-blur-lg p-10 rounded-xl">
    //         <img
    //           src={gif}
    //           className="w-96 h-96 aspect-square sm:w-60 sm:h-60 md:w-96 md:h-96 "
    //           alt="hero-gif"
    //         />
    //       </div>
    //       <div className="flex flex-col items-center justify-center gap-3  text-center sm:items-start sm:text-left">
    //         <h3 className="text-4xl font-bold">Gotta catch 'em all.</h3>
    //         <p className="font-semibold text-gray-600">
    //           Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    //         </p>
    //         <Button className="rounded-3xl">Explore</Button>
    //       </div>
    //       {/* <h1 className="text-4xl font-bold">Gotta Catch 'Em All.</h1>
    //     <p className="text-base font-medium w-80 text-center">
    //       Welcome in the world largest pokemon marketplace.
    //     </p>
    //     <Button variant={"link"} size={"default"}>
    //       Explore
    //     </Button> */}
    //     </div>
    //   </div>
    //   {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
    //         Data to enrich your online business
    //       </h1>
    //       <p className="mt-6 text-lg leading-8 text-gray-600">
    //         Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
    //         lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
    //         fugiat aliqua.
    //       </p>
    //       <div className="mt-10 flex items-center justify-center gap-x-6">
    //         <a
    //           href="#"
    //           className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           Get started
    //         </a>
    //         <a
    //           href="#"
    //           className="text-sm font-semibold leading-6 text-gray-900"
    //         >
    //           Learn more <span aria-hidden="true">→</span>
    //         </a>
    //       </div> */}
    //   {/* </div> */}
    //   {/* </div> */}
    //   <div
    //     className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    //     aria-hidden="true"
    //   >
    //     <div
    //       className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
    //       style={{
    //         clipPath:
    //           "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export default Hero;
