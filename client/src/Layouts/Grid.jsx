import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/loading";

const Grid = ({ img, title }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-4 w-full h-fit border-gray-200 rounded-2xl px-4 xl:px-0">
      <h1 className="text-3xl font-semibold border-b pb-3">{title}</h1>
      <div className="flex flex-col w-full h-full justify-center items-center">
        {img.isLoading ? (
          <div className="my-20">
            <Loading />
          </div>
        ) : !img.data ? (
          <div className="border bg-red-100 border-red-300 p-4 rounded-3xl my-20">
            <h1 className="text-red-500">Couldn't load images</h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-5  gap-10 py-8">
            {img.data.map((element) => {
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
                    <Badge
                      variant={"secondary"}
                      className={"rounded-md w-full"}
                    >
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
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
