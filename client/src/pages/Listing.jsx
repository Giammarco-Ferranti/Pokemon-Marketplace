import axios from "axios";
import React, { useState } from "react";

const Listing = () => {
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.user.rows[0].id;
    const formData = new FormData();
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
    };

    formData.append("image", img);
    // formData.append("id", userId);

    // formData.append("price", 150);
    // formData.append("description", "Pikatchu ultra rare");

    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }

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
    <div>
      <form
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
      </form>
    </div>
  );
};

export default Listing;
