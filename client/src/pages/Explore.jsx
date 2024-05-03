import Grid from "@/Layouts/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Explore = () => {
  const { name } = useParams();
  console.log(name);
  const [AllImg, setAllImg] = useState([]);
  console.log(AllImg);
  useEffect(() => {
    const getAllImages = async () => {
      const res = await axios.get("http://localhost:5010/product/all");
      setAllImg(res.data);
      console.log(res);
    };

    const getSearchImages = async (q) => {
      const res = await axios.get(
        `http://localhost:5010/product/products/search/?q=${q}`
      );
      setAllImg(res.data);
    };

    if (name === "all") {
      getAllImages();
    } else {
      getSearchImages(name);
    }
  }, [name]);
  return (
    <div className="flex flex-col h-full w-full justify-start items-center mt-20 p-4">
      <Grid img={AllImg} title={"Top Users"} />
    </div>
  );
};

export default Explore;
