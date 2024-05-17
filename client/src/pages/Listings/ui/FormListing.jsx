import React from "react";
import * as S from "./Listings.classes.js";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useListingsLogic } from "../Logic/useListingsLogic.js";
import { toast } from "sonner";

const FormListing = ({ type, productId }) => {
  const {
    setOpenUpdate,
    setImg,
    setName,
    setDescription,
    setPrice,
    setRarity,
    setNewName,
    setNewDescription,
    setNewPrice,
    setNewRarity,
    handleSubmit,
    mutationUpdate,
  } = useListingsLogic();
  return (
    <div className={S.drawerContent}>
      {type == "upload" ? (
        <form
          action="/"
          method="post"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
          className={S.form}
        >
          <Label htmlFor="imgFile">Image</Label>
          <Input
            required
            id="imgFile"
            type="file"
            name="imgFile"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <Label htmlFor="name">Name</Label>
          <Input
            required
            id="name"
            type="text"
            name="name"
            placeholder="Pikachu"
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            required
            id="description"
            placeholder="Enter a description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label htmlFor="price">Price</Label>
          <Input
            required
            id="price"
            type="number"
            name="price"
            placeholder="10$"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Select required onValueChange={(e) => setRarity(e)}>
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

          <Button type="submit">Submit</Button>
        </form>
      ) : type == "update" ? (
        <form
          action="/"
          method="post"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            mutationUpdate.mutate(productId);
            toast("Product Updated");
            setOpenUpdate(false);
          }}
          className={S.form}
        >
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

          <Button type="submit">Submit</Button>
        </form>
      ) : null}
    </div>
  );
};

export default FormListing;
