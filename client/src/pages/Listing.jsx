import DataTable from "@/Layouts/DataTable";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import useWindowDimensions from "@/hooks/useWindowWidth";

const defaultData = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

const columnHelper = createColumnHelper();

const Listing = () => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [rarity, setRarity] = useState();
  const [listings, setListings] = useState([]);
  const [openUpdate, setOpenUpdate] = useState();
  const [productId, setProductId] = useState();

  const [newName, setNewName] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newRarity, setNewRarity] = useState();

  const columns = [
    columnHelper.accessor("index", {
      id: "index",
      header: () => "#",
      cell: ({ row }) => {
        return <h3>{row.index + 1}</h3>;
      },
    }),
    columnHelper.accessor("img_path", {
      id: "Image",
      header: () => "Image",
      cell: ({ row }) => {
        return (
          <img
            src={`http://localhost:5010/${row.original.img_path}`}
            className="w-10"
          />
        );
      },
    }),
    columnHelper.accessor("name", {
      id: "Name",
      header: () => "Name",
      cell: ({ row }) => {
        return <h3>{row.original.name}</h3>;
      },
    }),
    columnHelper.accessor("description", {
      id: "description",
      header: () => "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => "Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      header: () => "Created",
      cell: ({ row }) => {
        return new Date(row.original.created_at).toLocaleDateString();
      },
    }),
    columnHelper.accessor("update", {
      id: "update",
      header: () => "",
      cell: ({ row }) => {
        return row.original.status !== "sold" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 hover:cursor-pointer"
            onClick={() => {
              setOpenUpdate(true);
              setProductId(row.original.id);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        ) : null;
      },
    }),
    columnHelper.accessor("delete", {
      id: "delete",
      header: () => "",
      cell: ({ row }) => {
        return row.original.status !== "sold" ? (
          <svg
            key={row.order_id}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
            onClick={() => handleDelete(row.original.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        ) : null;
      },
    }),
  ];

  const getData = async () => {
    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.user.rows[0].id;
    const res = await axios.get(
      `http://localhost:5010/product/products/${userId}`
    );
    setListings(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (productId) => {
    const res = await axios.delete(
      `http://localhost:5010/product/delete/${productId}`
    );
    console.log(res);
    if (res.status === 200) {
      getData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.user.rows[0].id;
    const formData = new FormData();
    console.log(userId);
    const payload = {
      id: userId,
      name: name,
      price: price,
      description: description,
      rarity: rarity,
    };

    formData.append("image", img);

    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }
    console.log(formData);

    const res = await axios.post(
      "http://localhost:5010/product/products/upload/",
      formData
    );
    console.log(res);
    if (res.status === 200) {
      setOpen(false);
      getData();
    }
  };

  console.log(productId);
  const handleUpdate = async (e) => {
    e.preventDefault();
    // const localData = JSON.parse(localStorage.getItem("user"));
    // const userId = localData.user.rows[0].id;
    // const formData = new FormData();

    const payload = {
      name: newName,
      price: newPrice,
      description: newDescription,
      rarity: newRarity,
    };
    console.log(payload, productId);

    // for (const [key, value] of Object.entries(payload)) {
    //   formData.append(key, value);
    // }

    const res = await axios.patch(
      `http://localhost:5010/product/update/${productId}`,
      payload
    );
    if (res.status === 200) {
      setOpenUpdate(false);
      getData();
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center mt-20">
      <h1 className="text-3xl font-semibold">Your Listings</h1>

      <Button onClick={() => setOpen(true)}>Add new</Button>
      {width < 990 ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="flex flex-col w-full h-[80%]">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <form
                action="/"
                method="post"
                encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
                className="w-fit h-fit flex flex-col gap-3"
              >
                {/* <input
                accept="image/*"
                name="image"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              /> */}
                <Label htmlFor="imgFile">Image</Label>
                <Input
                  id="imgFile"
                  type="file"
                  name="imgFile"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Pikatchu"
                  onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="10$"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Select onValueChange={(e) => setRarity(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                  </SelectContent>
                </Select>

                {/* <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                className="border border-gray-300 rounded-lg"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              /> */}
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <form
                action="/"
                method="post"
                encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
                className="w-fit h-fit flex flex-col gap-3"
              >
                {/* <input
                accept="image/*"
                name="image"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              /> */}
                <Label htmlFor="imgFile">Image</Label>
                <Input
                  id="imgFile"
                  type="file"
                  name="imgFile"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Pikatchu"
                  onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="10$"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Select onValueChange={(e) => setRarity(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                  </SelectContent>
                </Select>

                {/* <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                className="border border-gray-300 rounded-lg"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              /> */}
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {width < 990 ? (
        <Drawer open={openUpdate} onOpenChange={setOpenUpdate}>
          <DrawerContent className="flex flex-col w-full h-[80%]">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <form
                action="/"
                method="post"
                encType="multipart/form-data"
                onSubmit={(e) => handleUpdate(e)}
                className="w-fit h-fit flex flex-col gap-3"
              >
                {/* <input
                accept="image/*"
                name="image"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              /> */}
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Pikatchu"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="10$"
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <Select onValueChange={(e) => setNewRarity(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                  </SelectContent>
                </Select>

                {/* <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                className="border border-gray-300 rounded-lg"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              /> */}
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <form
                action="/"
                method="post"
                encType="multipart/form-data"
                onSubmit={(e) => handleUpdate(e)}
                className="w-fit h-fit flex flex-col gap-3"
              >
                {/* <input
                accept="image/*"
                name="image"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              /> */}

                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Pikatchu"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="10$"
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <Select onValueChange={(e) => setNewRarity(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                  </SelectContent>
                </Select>

                {/* <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-lg"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                className="border border-gray-300 rounded-lg"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              /> */}
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <DataTable columns={columns} data={listings} />
      {/* <form
        action="/"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          accept="image/*"
          name="image"
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 rounded-lg"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input className="ml-5" type="submit" />
      </form> */}
    </div>
  );
};

export default Listing;
