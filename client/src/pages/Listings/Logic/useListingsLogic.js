import { fetchData } from "@/utils/fetchData";
import { uploadImage } from "@/utils/supabase/connection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

// Ottieni questi valori dalla tua dashboard di Supabase
const supabaseUrl = "https://lcifhlixvidmtkylidkx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaWZobGl4dmlkbXRreWxpZGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjY4NTQsImV4cCI6MjAzMTQ0Mjg1NH0.p-5nQtZWvy_zJtULbF-8WQyl2wOWzSFayr1gimRGni4"; // Usa la chiave anonima per operazioni dal lato client

const supabase = createClient(supabaseUrl, supabaseKey);

export const useListingsLogic = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [imgPath, setImgPath] = useState();
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

  const getData = useQuery({
    queryKey: ["product-by-user", userId],
    queryFn: () => {
      return fetchData("get", `/product/products/${userId}`);
    },
  });

  const deleteListing = async () => {
    console.log(imgPath);
    const { data, error } = await supabase.storage
      .from("Pokemon")
      .remove(imgPath);
    console.log(data);
    if (data) {
      handleDelete.mutate();
    }
  };

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
    // const formData = new FormData();
    const { data, error } = await supabase.storage
      .from("Pokemon")
      .upload(`Images/${img.name}`, img);
    console.log(data);
    if (data) {
      const payload = {
        path: data.fullPath,
        id: userId,
        name: name,
        price: price,
        description: description,
        rarity: rarity,
        status: "Available",
      };
      console.log(payload);
      mutationSubmit.mutate(payload);
      setOpen(false);
      toast("Product added");
    } else {
      console.log(error);
    }

    // formData.append("image", img);

    // for (const [key, value] of Object.entries(payload)) {
    //   formData.append(key, value);
    // }
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
    setImgPath,
    deleteListing,
  };
};
