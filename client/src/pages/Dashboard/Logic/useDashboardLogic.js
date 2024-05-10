import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useDashboardLogic = () => {
  const mostValuable = useQuery({
    queryKey: ["most-expensive"],
    queryFn: () => fetchData("get", "/product/products/most-expensive"),
  });

  const bestUsers = useQuery({
    queryKey: ["best-users"],
    queryFn: () => fetchData("get", "/user/best-users"),
  });

  return {
    mostValuable,
    bestUsers,
  };
};
