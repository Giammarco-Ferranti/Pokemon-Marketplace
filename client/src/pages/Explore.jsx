import Grid from "@/Layouts/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [AllImg, setAllImg] = useState([]);
  console.log(AllImg);
  useEffect(() => {
    const getAllImages = async () => {
      const res = await axios.get("http://localhost:5010/product/");
      setAllImg(res.data);
      console.log(res);
    };
    getAllImages();
  }, []);
  return (
    <div className="flex flex-col h-full w-full justify-start items-center mt-20 p-4">
      <Grid img={AllImg} title={"Top Users"} />
    </div>
  );
};

export default Explore;
