import DataTable from "@/Layouts/DataTable";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import React, { useState } from "react";
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

const columns = [
  columnHelper.accessor("index", {
    id: "index",
    header: () => "#",
    cell: ({ row }) => {
      return <h3>{row.index + 1}</h3>;
    },
  }),
  columnHelper.accessor("name", {
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
  columnHelper.accessor("Name", {
    id: "Name",
    header: () => "Name",
    cell: ({ row }) => {
      return <h3>{row.name}</h3>;
    },
  }),
  columnHelper.accessor("volume", {
    id: "volume",
    header: () => "Volume",
    cell: (info) => info.getValue(),
  }),
];

const Listing = () => {
  const { path } = useParams();
  console.log(path);
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [rarity, setRarity] = useState();
  console.log(name, description, price, rarity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.user.rows[0].id;
    const formData = new FormData();
    console.log(userId);
    // formData.append("image", img);
    // //console.log(formData.has("image"));

    // const payload = {
    //   id: userId,
    //   price: 150,
    //   description: "Pikatchu ultra rare",
    // };
    // formData.append("image", img, "data", payload);

    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };

    const payload = {
      id: userId,
      name: name,
      price: price,
      description: description,
      rarity: rarity,
    };

    formData.append("image", img);

    // formData.append("id", userId);

    // formData.append("price", 150);
    // formData.append("description", "Pikatchu ultra rare");

    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }
    console.log(formData);
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };

    //const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(
      "http://localhost:5010/product/upload",
      formData
    );
    // setLoadImage(res.data[0].img.replace("images/", ""));
    console.log(res);
  };

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center mt-20">
      <h1 className="text-3xl font-semibold">Your Listings</h1>

      <Drawer>
        <DrawerTrigger>
          <Button>Add new</Button>
        </DrawerTrigger>
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
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                name="image"
                accept="image/*"
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
      <DataTable columns={columns} data={defaultData} />
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
