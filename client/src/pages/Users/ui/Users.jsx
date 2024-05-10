import { DataTable } from "@/Layouts";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useUsersLogic } from "../Logic/useUsersLogic";
import * as S from "./Users.classes.js";
import verifiedIcon from "../../../assets/hexagon-check.svg";

const columnHelper = createColumnHelper();

const Users = () => {
  const columns = [
    columnHelper.accessor("index", {
      id: "index",
      enableSorting: false,
      header: () => "#",
      cell: ({ row }) => {
        return <h3 className="text-gray-500">{row.index + 1}</h3>;
      },
    }),
    columnHelper.accessor("Name", {
      id: "Name",
      enableSorting: false,
      header: () => "Name",
      cell: ({ row }) => {
        return (
          <h3 className="flex flex-row gap-2">
            {row.original.user_name}{" "}
            <img src={verifiedIcon} className="w-4 " alt="verified" />
          </h3>
        );
      },
    }),
    columnHelper.accessor("volume", {
      id: "volume",
      enableSorting: true,
      header: () => "Volume",
      cell: ({ row }) => {
        return <h3>{row.original.total_volume} €</h3>;
      },
    }),
    columnHelper.accessor("change", {
      id: "change",
      enableSorting: false,
      header: () => "Change",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-start">
            {Math.random() < 0.5 ? (
              <p className={S.priceChangeRed}>
                {Math.floor(Math.random() * 100) / 100}
              </p>
            ) : (
              <p className={S.priceChangeGreen}>
                {Math.floor(Math.random() * 100) / 100}
              </p>
            )}
          </div>
        );
      },
    }),
  ];
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
