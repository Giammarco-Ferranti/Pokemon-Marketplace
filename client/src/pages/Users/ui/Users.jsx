import { DataTable } from "@/Layouts";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useUsersLogic } from "../Logic/useUsersLogic";
import * as S from "./Users.classes.js";

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
      return <h3>{row.original.total_volume}</h3>;
    },
  }),
];

const Users = () => {
  const { getUsers } = useUsersLogic();

  return (
    <div className={S.usersWrapper}>
      <h1 className={S.usersTitle}>Top users</h1>
      {getUsers.data ? (
        <DataTable columns={columns} data={getUsers.data} />
      ) : null}
    </div>
  );
};

export default Users;
