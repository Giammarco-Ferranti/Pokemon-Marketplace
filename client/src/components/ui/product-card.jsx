import React from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Badge } from "./badge";
import { useNavigate } from "react-router-dom";
import verifiedSvg from "../../assets/hexagon-check.svg";

const ProductCard = ({ element }) => {
  const navigate = useNavigate();

  if (!element) return null;
  return (
    <Card
      key={element.id}
      className="rounded-xl cursor-pointer hover:opacity-70 transition-all"
      onClick={() => navigate(`/product/${element.id}`)}
    >
      <CardContent className="p-2">
        <img
          src={`http://localhost:5010/${element.img_path}`}
          className="rounded-md"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-2 pt-0 text-sm font-semibold">
        <Badge variant={"secondary"} className={"rounded-md w-full"}>
          <div>
            <p className="text-xl flex flex-row gap-1 font-bold">
              {element.name}{" "}
              <img alt="verified" src={verifiedSvg} className="w-4 " />
            </p>
            <p className="font-semibold  text-sm">{element.price}€</p>
          </div>
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
