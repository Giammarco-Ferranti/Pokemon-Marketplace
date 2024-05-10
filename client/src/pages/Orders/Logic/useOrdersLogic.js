import { fetchData } from "@/utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useOrdersLogic = () => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState();
  const [productId, setProductId] = useState();
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const getOrders = useQuery({
    queryKey: ["get-orders", userId],
    queryFn: () => {
      const payload = {
        userId: userId,
      };
      return fetchData("post", "/order/get-all", payload);
    },
  });

  const handleUpdate = useMutation({
    mutationFn: async (payload) => {
      await fetchData("post", "/order/update-status", payload);
      getOrders.refetch();
    },
  });
  const handleDelete = useMutation({
    mutationFn: async (orderId) => {
      console.log(productId);
      await fetchData("delete", `/order/delete/${orderId}`, {
        productId: productId,
      });
      getOrders.refetch();
      toast("Order deleted");
    },
  });

  const updateOrders = (orderId, status) => {
    const payload = {
      orderId: orderId,
      value: status,
    };

    if (payload.value !== "") {
      handleUpdate.mutate(payload);
    }
  };

  return {
    open,
    setOpen,
    orderId,
    setOrderId,
    setProductId,
    status,
    setStatus,
    openDialog,
    setOpenDialog,
    getOrders,
    handleDelete,
    handleUpdate,
    updateOrders,
  };
};
