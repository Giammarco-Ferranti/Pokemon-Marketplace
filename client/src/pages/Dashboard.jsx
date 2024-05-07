import { useNavigate } from "react-router-dom";
import Grid from "@/Layouts/Grid";
import DataTable from "@/Layouts/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import gif from "../assets/blastoise-mega.gif";

const columnHelper = createColumnHelper();

function Dashboard() {
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
  const navigate = useNavigate();
  const mostValuable = useQuery({
    queryKey: ["most-expensive"],
    queryFn: () => fetchData("get", "/product/products/most-expensive"),
  });

  const bestUsers = useQuery({
    queryKey: ["best-users"],
    queryFn: () => fetchData("get", "/user/best-users"),
  });

  return (
    <>
      <div className="flex flex-row py-16 w-full h-fit sm:h-screen justify-center items-center rounded-3xl mt-5">
        <div className="w-full flex flex-col gap-10 items-center justify-center h-fit bg-[#FBF3D5] px-5 py-5 sm:py-20 rounded-2xl sm:flex-row  sm:gap-24 mx-4 xl:mx-0">
          <div className="bg-white p-10 rounded-xl">
            <img
              src={gif}
              className="w-96 h-96 aspect-square sm:w-60 sm:h-60 md:w-96 md:h-96 "
              alt="hero-gif"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-3  text-center sm:items-start sm:text-left">
            <h3 className="text-4xl font-bold">Gotta catch 'em all.</h3>
            <p className="font-semibold text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <Button className="rounded-3xl">Explore</Button>
          </div>
        </div>
      </div>

      <Grid img={mostValuable} title={"Best"} />
      <Button
        onClick={() => navigate("/explore/all")}
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
        data={bestUsers.data ? bestUsers.data.slice(0, 5) : []}
        title={"Best Users"}
      />
    </>
  );
}

export default Dashboard;
