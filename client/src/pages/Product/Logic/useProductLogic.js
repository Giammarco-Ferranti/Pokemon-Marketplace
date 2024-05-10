import { fetchData } from "@/utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProductLogic = (productId) => {
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
  return {
    user,
    fetchProduct,
    handleOrder,
  };
};
