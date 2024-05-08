import DataTable from "@/Layouts/DataTable";
import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("index", {
    id: "index",
    header: () => "#",
    cell: ({ row }) => {
      return <h3>{row.index + 1}</h3>;
    },
  }),
  columnHelper.accessor("Name", {
    id: "Name",
    header: () => "Name",
    cell: ({ row }) => {
      return <h3>{row.original.user_name}</h3>;
    },
  }),
  columnHelper.accessor("volume", {
    id: "volume",
    header: () => "Volume",
    cell: ({ row }) => {
      return <h3>{row.original.total_price}</h3>;
    },
  }),
];

const Users = () => {
  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchData("get", `/user/best-users`),
  });

  return (
    <div className="flex flex-col h-screen w-full justify-start items-center mt-20 p-4">
      <h1 className="text-3xl self-start">Top users</h1>
      {getUsers.data ? (
        <DataTable columns={columns} data={getUsers.data} />
      ) : null}
    </div>
  );
};

export default Users;
