import { fetchData } from "@/utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useListingsLogic = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [rarity, setRarity] = useState();
  const [openUpdate, setOpenUpdate] = useState();
  const [productId, setProductId] = useState();
  const [newName, setNewName] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newRarity, setNewRarity] = useState();
  const localData = JSON.parse(localStorage.getItem("user"));
  const userId = localData.id;
  console.log(openUpdate);

  const getData = useQuery({
    queryKey: ["product-by-user", userId],
    queryFn: () => {
      return fetchData("get", `/product/products/${userId}`);
    },
  });

  const handleDelete = useMutation({
    mutationFn: async () => {
      await fetchData("delete", `/product/delete/${productId}`);
      getData.refetch();
      toast("Order Deleted");
    },
  });

  const mutationSubmit = useMutation({
    mutationFn: async (payload) => {
      await fetchData("post", "/product/products/upload/", payload);
      getData.refetch();
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.id;
    const formData = new FormData();
    const payload = {
      id: userId,
      name: name,
      price: price,
      description: description,
      rarity: rarity,
      status: "Available",
    };

    formData.append("image", img);

    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }

    mutationSubmit.mutate(formData);
    setOpen(false);
    toast("Product added");
  };

  const mutationUpdate = useMutation({
    mutationFn: async (productId) => {
      const payload = {
        name: newName,
        price: newPrice,
        description: newDescription,
        rarity: newRarity,
      };
      console.log(productId);

      await fetchData("patch", `/product/update/${productId}`, payload);
      getData.refetch();
    },
  });

  return {
    openDialog,
    open,
    setOpen,
    openUpdate,
    setOpenUpdate,
    getData,
    setOpenDialog,
    setImg,
    setName,
    setDescription,
    setPrice,
    setRarity,
    setProductId,
    setNewName,
    setNewDescription,
    setNewPrice,
    setNewRarity,
    handleDelete,
    handleSubmit,
    mutationUpdate,
    productId,
  };
};
