import { useState } from "react";
import axios from "axios";
import imgl from "/Users/giammarcoferranti/Desktop/Pokemon-Final-Project/api/images/1712768167479.jpg";

function App() {
  const [img, setImg] = useState();
  const [loadImage, setLoadImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const formData = new FormData();
    formData.append("image", img);
    // console.log(formData);
    //const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post("http://localhost:5010", formData);
    setLoadImage(res.data);
  };

  console.log(loadImage);

  return (
    <>
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
      <img src={imgl} />
    </>
  );
}

export default App;
