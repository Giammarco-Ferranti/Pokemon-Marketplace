import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/Auth/AuthContext";
import { fetchData } from "@/utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

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
    const payload = {
      productId: productId,
      userId: user.id,
      status: "Shipped",
    };
    mutation.mutate(payload);
  };

  if (!fetchProduct.data) return null;

  return fetchProduct.data.map((item) => {
    return (
      <div
        key={item.id}
        className="w-full flex flex-col justify-center items-start mt-10"
      >
        <div className="rounded-xl w-full flex flex-row justify-start items-center">
          <img
            alt="product-image"
            src={`http://localhost:5010/${item.img_path}`}
            className="w-60"
          />
          <div className="flex flex-col">
            <h1>{item.name}</h1>
            <h3>{item.rarity}</h3>
            <h3>{item.user_name}</h3>

            <h3>{item.price} €</h3>
            {token ? (
              fetchProduct.data[0].user_id === user.id ? (
                <Button
                  onClick={() => {
                    toast("You can't buy your own product");
                  }}
                >
                  Your product
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleOrder();
                    toast("Product Bought!", {
                      action: {
                        label: "Orders",
                        onClick: () => navigate("/profile/orders"),
                      },
                    });
                  }}
                >
                  Buy
                </Button>
              )
            ) : (
              <Button onClick={() => navigate("/login")}>Log in to buy</Button>
            )}
          </div>
        </div>
        <div>
          <h3>Decription</h3>
          <p>{item.description}</p>
        </div>
      </div>
    );
  });
};

export default Product;
