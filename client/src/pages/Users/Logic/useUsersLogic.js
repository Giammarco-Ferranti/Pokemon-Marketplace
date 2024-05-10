import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useUsersLogic = () => {
  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchData("get", `/user/best-users`),
  });
  return {
    getUsers,
  };
};
