import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useExploreLogic = (name) => {
  const getImages = useQuery({
    queryKey: ["images-filtered", name],
    queryFn: () => {
      if (name === "all" || name === "") {
        return fetchData("get", "/product/all");
      } else {
        return fetchData("get", `/product/products/search/?q=${name}`);
      }
    },
  });

  return {
    getImages,
  };
};
