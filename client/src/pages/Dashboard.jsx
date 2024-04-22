import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../utils/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Hero from "../Layouts/Hero";
import Grid from "@/Layouts/Grid";

import DataTable from "@/Layouts/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Footer from "@/Layouts/Footer";

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
  columnHelper.accessor("name", {
    id: "Image",
    header: () => "Image",
    cell: ({ row }) => {
      console.log(row.original.name);
      return (
        <img
          src={`http://localhost:5010/${row.original.name}`}
          className="w-10"
        />
      );
    },
  }),
  columnHelper.accessor("Rarity", {
    id: "Rarity",
    header: () => "Rarity",
    cell: (info) => {
      return (
        <Badge className={"bg-purple-200 text-purple-800 rounded-lg"}>
          Ultra Rare
        </Badge>
      );
    },
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: () => "Amount",
    cell: (info) => info.getValue(),
  }),
];

function Dashboard() {
  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  // const { setToken } = useAuth();
  // const navigate = useNavigate();

  // const [img, setImg] = useState();
  // //console.log(img);
  // const [loadImage, setLoadImage] = useState("");
  const [AllImg, setAllImg] = useState([]);

  // useEffect(() => {
  //   const getDataBack = async () => {
  //     const res = await axios.get(`http://localhost:5010/image/${loadImage}`);
  //     setImg(res.data[0].img.replace("images/", ""));
  //     //setImg(res.data);
  //   };
  //   getDataBack();
  // }, [loadImage]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(e.target[0].value);

  //   const formData = new FormData();
  //   formData.append("image", img);
  //   // console.log(formData);
  //   //const config = { headers: { "Content-Type": "multipart/form-data" } };
  //   const res = await axios.post("http://localhost:5010", formData);
  //   setLoadImage(res.data[0].img.replace("images/", ""));
  // };

  // const handleLogout = () => {
  //   setToken(null);
  //   navigate("/login");
  //   localStorage.removeItem("token");
  // };

  // const columns = [
  //   {
  //     accessorKey: "status",
  //     header: "status",
  //   },
  // ];

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
      <Hero />
      <Grid img={AllImg} />
      <DataTable columns={columns} data={AllImg} />
      <Footer />
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
        <input type="submit" />
      </form>

      <button onClick={handleLogout} className="bg-slate-400 p-4">
        Logouts
      </button>

      {img ? (
        <img src={`http://localhost:5010/${img}`} />
      ) : (
        AllImg.map((element) => {
          if (element.name == undefined || element.name == null) return null;
          return <img src={`http://localhost:5010/${element.name}`} />;
        })
      )} */}
    </>
  );
}

export default Dashboard;
