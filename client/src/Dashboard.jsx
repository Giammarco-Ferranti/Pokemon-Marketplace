import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  const [img, setImg] = useState();
  //console.log(img);
  const [loadImage, setLoadImage] = useState("");
  const [AllImg, setAllImg] = useState([]);
  console.log(AllImg);

  useEffect(() => {
    const getDataBack = async () => {
      const res = await axios.get(`http://localhost:5010/image/${loadImage}`);
      setImg(res.data[0].img.replace("images/", ""));
      //setImg(res.data);
    };
    getDataBack();
  }, [loadImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const formData = new FormData();
    formData.append("image", img);
    // console.log(formData);
    //const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post("http://localhost:5010", formData);
    setLoadImage(res.data[0].img.replace("images/", ""));
  };

  useEffect(() => {
    const getAllImages = async () => {
      const res = await axios.get("http://localhost:5010/all");
      setAllImg(res.data);
    };
    getAllImages();
  }, []);

  //console.log(img);

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

      {img ? (
        <img src={`http://localhost:5010/${img}`} />
      ) : (
        AllImg.map((element) => {
          if (element.name == undefined || element.name == null) return null;
          return <img src={`http://localhost:5010/${element.name}`} />;
        })
      )}
    </>
  );
}

export default Dashboard;
