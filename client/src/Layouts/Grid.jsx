import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Grid = ({ img }) => {
  console.log(img);
  return (
    <div className="mt-20 w-full h-fit border-gray-200 rounded-xl border p-8">
      <h1 className="text-3xl font-semibold border-b pb-3">Header</h1>
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-5  gap-10 py-8">
          {img.map((element, index) => {
            return (
              <Card className="rounded-xl">
                <CardContent className="p-2">
                  <img
                    src={`http://localhost:5010/${element.name}`}
                    className="rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-2 pt-0 text-sm font-semibold">
                  <Badge variant={"outline"} className={"rounded-md w-full"}>
                    <div>
                      <p className="text-base ">Pikatchu</p>
                      <p>150€ - 1 month</p>
                    </div>
                  </Badge>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grid;
