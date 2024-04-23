import axios from "axios";
import React, { useState } from "react";

const Listing = () => {
  const [img, setImg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const formData = new FormData();
    formData.append("image", img);
    // console.log(formData);
    //const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post("http://localhost:5010", formData);
    // setLoadImage(res.data[0].img.replace("images/", ""));
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default Listing;
