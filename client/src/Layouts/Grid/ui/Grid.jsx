import React from "react";
import Loading from "@/components/ui/loading";
import * as S from "./Grid.classes.js";
import Error from "@/components/ui/error.jsx";
import ProductCard from "@/components/ui/product-card.jsx";

const Grid = ({ img, title }) => {
  return (
    <div className={S.gridWrapper}>
      <h1 className={S.gridTitle}>{title}</h1>
      <div className={S.gridWrapperContent}>
        {img.isLoading ? (
          <div className={S.gridLoadingWrapper}>
            <Loading />
          </div>
        ) : !img.data ? (
          <Error />
        ) : (
          <div className={S.gridContent}>
            {img.data.map((element) => {
              return <ProductCard element={element} key={element.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
