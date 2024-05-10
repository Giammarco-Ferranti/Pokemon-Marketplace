import { Grid } from "@/Layouts";
import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { useParams } from "react-router-dom";

const Explore = () => {
  const { name } = useParams();

  const getImages = useQuery({
    queryKey: ["images-filtered", name],
    queryFn: () => {
      if (name === "all" || name === "") {
        return fetchData("get", "/product/all");
      } else {
        return fetchData("get", `/product/products/search/?q=${name}`);
      }
    },
  });

  return (
    <div className="flex flex-col h-full w-full justify-start items-center mt-20 p-4">
      <h1>{name === "all" ? "All products" : `Search ${name}`}</h1>
      <Grid img={getImages} />
    </div>
  );
};

export default Explore;
