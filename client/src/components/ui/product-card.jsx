import React from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Badge } from "./badge";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ element }) => {
  const navigate = useNavigate();
  if (!element) return null;
  return (
    <Card
      key={element.id}
      className="rounded-xl"
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
            <p className="text-base ">{element.name}</p>
            <p>
              {element.price}€ -{" "}
              {new Date(element.created_at).toLocaleDateString()}
            </p>
          </div>
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
