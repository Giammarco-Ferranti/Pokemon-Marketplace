import { Button } from "@/components/ui/button";
import { fetchData } from "@/utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const fetchProduct = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchData("get", `/product/${productId}`),
  });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await fetchData("post", "/order", payload);
    },
  });

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const payload = {
      productId: productId,
      userId: userId,
      status: "Shipped",
    };
    mutation.mutate(payload);
  };

  if (!fetchProduct.data) return null;

  return (
    <div className="w-full flex flex-col justify-center items-start mt-10">
      <div className="rounded-xl w-full flex flex-row justify-start items-center">
        <img
          alt="product-image"
          src={`http://localhost:5010/${fetchProduct.data[0].img_path}`}
          className="w-60"
        />
        <div className="flex flex-col">
          <h1>Title</h1>
          <h3>Rarity</h3>
          <h3>Owner</h3>

          <h3>150€</h3>
          {localStorage.getItem("token") ? (
            <Button onClick={handleOrder}>Buy</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Log in to buy</Button>
          )}
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
