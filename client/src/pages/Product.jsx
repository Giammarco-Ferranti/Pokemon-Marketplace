import React from "react";

const Product = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start mt-10">
      <div className="rounded-xl w-full flex flex-row justify-start items-center">
        <img
          alt="product-image"
          src={"http://localhost:5010/1713109449025.webp"}
          className="w-60"
        />
        <div className="flex flex-col">
          <h1>Title</h1>
          <h3>Rarity</h3>
          <h3>Owner</h3>

          <h3>150€</h3>
        </div>
      </div>
      <div>
        <h3>Decription</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem alias quis voluptatem facere, excepturi dolor ab,
          voluptatum eos mollitia debitis accusantium veritatis harum ipsum
          aliquam! Nihil corporis temporibus sed magnam!
        </p>
        <h3>Details</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem alias quis voluptatem facere, excepturi dolor ab,
          voluptatum eos mollitia debitis accusantium veritatis harum ipsum
          aliquam! Nihil corporis temporibus sed magnam!
        </p>
      </div>
      <div>
        <h3>Similar</h3>
        <div className="flex flex-row w-full overflow-scroll gap-5">
          {[1, 2, 3, 4, 5].map((element) => {
            return (
              <div className="w-30 h-40 bg-gray-300 flex flex-row items-center justify-center">
                {element}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
