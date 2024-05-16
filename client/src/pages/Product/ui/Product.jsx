import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/Auth/AuthContext";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useProductLogic } from "../Logic/useProductLogic";
import * as S from "./Product.classes.js";
import avatar from "../../../assets/avatar.jpg";
import verifiedIcon from "../../../assets/hexagon-check.svg";

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
            src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}${item.img_path}`}
            className={S.productImage}
          />
          <div className={S.productDetails}>
            <div className={S.avatarNameWrapper}>
              <img src={avatar} alt="avatar" className={S.avatar} />
              <h3 className={S.username}>{item.user_name}</h3>
              <img src={verifiedIcon} alt="verified" className="w-4" />
            </div>
            <h1 className={S.productName}>{item.name}</h1>
            <h3
              className={
                item.rarity === "Ultra Rare"
                  ? S.productUltraRare
                  : item.rarity === "Rare"
                  ? S.productRare
                  : item.rarity === "Basic"
                  ? S.productBasic
                  : S.productCommon
              }
            >
              {item.rarity}
            </h3>
            <div className={S.priceWrapper}>
              <div className={S.priceTextWrapper}>
                <p className={S.priceText}>Current Price</p>
                <h3 className={S.productPrice}>{item.price} €</h3>
              </div>
              {token ? (
                fetchProduct.data[0].user_id === user.id ? (
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast("You can't buy your own product");
                    }}
                  >
                    Your product
                  </Button>
                ) : (
                  <Button
                    className="w-full"
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
                <Button className="w-full" onClick={() => navigate("/login")}>
                  Log in to buy
                </Button>
              )}
            </div>
            <div className={S.descriptionWrapper}>
              <h3 className={S.descriptionTitle}>Decription</h3>
              <p className={S.productDescription}>{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default Product;
