import DataTable from "@/Layouts/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

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
const Orders = () => {
  return (
    <div
      className="flex flex-col w-full p-4 h-screen justify-start
     items-center mt-20"
    >
      <h1 className="text-3xl font-semibold">Your orders</h1>
      <DataTable columns={columns} data={defaultData} />
    </div>
  );
};

export default Orders;
