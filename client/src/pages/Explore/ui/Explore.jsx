import { Grid } from "@/Layouts";

import React from "react";
import { useParams } from "react-router-dom";
import { useExploreLogic } from "../Logic/useExploreLogic";
import * as S from "./Explore.classes.js";

const Explore = () => {
  const { name } = useParams();
  const { getImages } = useExploreLogic(name);

  return (
    <div className={S.exploreWrapper}>
      <h1>{name === "all" ? "All products" : `Search ${name}`}</h1>
      <Grid img={getImages} />
    </div>
  );
};

export default Explore;
