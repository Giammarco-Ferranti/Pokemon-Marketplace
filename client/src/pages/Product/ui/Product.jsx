import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/Auth/AuthContext";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useProductLogic } from "../Logic/useProductLogic";
import * as S from "./Product.classes.js";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { user, fetchProduct, handleOrder } = useProductLogic(productId);

  if (!fetchProduct.data) return null;

  return fetchProduct.data.map((item) => {
    return (
      <div key={item.id} className={S.productWrapper}>
        <div className={S.productDetailsWrapper}>
          <img
            alt="product-image"
            src={`http://localhost:5010/${item.img_path}`}
            className="w-60"
          />
          <div className={S.productDetails}>
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
