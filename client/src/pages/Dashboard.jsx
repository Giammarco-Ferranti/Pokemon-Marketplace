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
import { Button } from "@/components/ui/button";

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

function Dashboard() {
  const navigate = useNavigate();
  const [MostValuable, setMostValuable] = useState([]);
  const [bestUsers, setBestUsers] = useState([]);
  const getMostValuableProducts = async () => {
    const res = await axios.get(
      "http://localhost:5010/product/products/most-expensive"
    );
    setMostValuable(res.data);
  };

  const getBestUsers = async () => {
    const res = await axios.get("http://localhost:5010/user/best-users");
    setBestUsers(res.data);
  };
  useEffect(() => {
    getMostValuableProducts();
    getBestUsers();
  }, []);

  return (
    <>
      <Hero />
      <Grid img={MostValuable} title={"Best"} />
      <Button
        onClick={() => navigate("/explore")}
        variant="outline"
        className="rounded-3xl"
        size="lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </Button>
      <DataTable
        columns={columns}
        data={bestUsers.slice(0, 5)}
        title={"Trending Categories"}
      />

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
