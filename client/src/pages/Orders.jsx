import DataTable from "@/Layouts/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useWindowDimensions from "@/hooks/useWindowWidth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// const columns = [
//   columnHelper.accessor("index", {
//     id: "index",
//     header: () => "#",
//     cell: ({ row }) => {
//       return <h3>{row.index + 1}</h3>;
//     },
//   }),
//   columnHelper.accessor("name", {
//     id: "Image",
//     header: () => "Image",
//     cell: ({ row }) => {
//       return (
//         <img
//           src={`http://localhost:5010/${row.original.product_image}`}
//           className="w-10"
//         />
//       );
//     },
//   }),
//   columnHelper.accessor("Name", {
//     id: "Name",
//     header: () => "Name",
//     cell: ({ row }) => {
//       return <h3>{row.original.product_name}</h3>;
//     },
//   }),
//   columnHelper.accessor("product_price", {
//     id: "price",
//     header: () => "Price",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("order_status", {
//     id: "status",
//     header: () => "Status",
//     cell: ({ row }) => {
//       return (
//         <div className="flex flex-row gap-3 items-center justify-start">
//           <h1>{row.original.order_status}</h1>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-4 h-4 hover:cursor-pointer"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
//             />
//           </svg>
//         </div>
//       );
//     },
//   }),
//   columnHelper.accessor("order_date", {
//     id: "date",
//     header: () => "Date",
//     cell: ({ row }) => {
//       return <h1 key={row.order_id}>{row.original.order_date}</h1>;
//     },
//   }),
//   columnHelper.accessor("delete", {
//     id: "date",
//     header: () => "",
//     cell: ({ row }) => {
//       return (
//         <svg
//           key={row.order_id}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6 text-red-500"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//           />
//         </svg>
//       );
//     },
//   }),
// ];
const Orders = () => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  console.log(open);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState();
  const [status, setStatus] = useState("");
  console.log(orderId);

  const columns = [
    columnHelper.accessor("index", {
      id: ({ row }) => {
        row.order_id;
      },
      header: () => "#",
      cell: ({ row }) => {
        return <h3 key={row.order_id}>{row.index + 1}</h3>;
      },
    }),
    columnHelper.accessor("product_image", {
      id: "Image",
      header: () => "Image",
      cell: ({ row }) => {
        return (
          <img
            key={row.order_id}
            src={`http://localhost:5010/${row.original.product_image}`}
            className="w-10"
          />
        );
      },
    }),
    columnHelper.accessor("Name", {
      id: "Name",
      header: () => "Name",
      cell: ({ row }) => {
        return <h3 key={row.order_id}>{row.original.product_name}</h3>;
      },
    }),
    columnHelper.accessor("product_price", {
      id: "price",
      header: () => "Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("order_status", {
      id: "status",
      header: () => "Status",
      cell: ({ row }) => {
        return (
          <div
            key={row.order_id}
            className="flex flex-row gap-3 items-center justify-start"
          >
            <h1>{row.original.order_status}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 hover:cursor-pointer"
              onClick={() => {
                setOpen(true);
                setOrderId(row.original.order_id);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        );
      },
      meta: {
        setOpen,
      },
    }),
    // columnHelper.accessor("order_date", {
    //   id: "date",
    //   header: () => "Date",
    //   cell: ({ row }) => {
    //     const data = new Date(row.original.order_date).toLocaleDateString();
    //     return <h1 key={row.order_id}>{data}</h1>;
    //   },
    // }),
    columnHelper.accessor("delete", {
      id: "date",
      header: () => "",
      cell: ({ row }) => {
        return (
          <svg
            key={row.order_id}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
            onClick={() => handleDelete(row.original.order_id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        );
      },
    }),
  ];

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user.rows[0].id;
    const payload = {
      userId: userId,
    };
    const res = await axios.post(
      "http://localhost:5010/order/get-all",
      payload
    );
    setOrders(res.data);
    console.log(res.data);
  };

  const updateOrders = async (orderId, status) => {
    const payload = {
      orderId: orderId,
      value: status,
    };
    const res = await axios.post(
      "http://localhost:5010/order/update-status",
      payload
    );
    console.log(res);
  };

  const handleDelete = async (orderId) => {
    const res = await axios.delete(
      `http://localhost:5010/order/delete/${orderId}`
    );
    console.log(res);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div
      className="flex flex-col w-full p-4 h-screen justify-start
     items-center mt-20"
    >
      {width < 990 ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[90%]">
            <DrawerHeader className="text-left">
              <DrawerTitle>Change order status</DrawerTitle>
              <DrawerDescription className="flex flex-col w-full justify-center items-center gap-3">
                Change the order status to delivered if the current status is
                shipped.
                <Select onValueChange={(e) => setStatus(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Shipped" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button
                  onClick={() => {
                    updateOrders(orderId, status);
                    setOpen(false);
                  }}
                  variant="default"
                >
                  Sumbit
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change order status</DialogTitle>
              <DialogDescription>
                Change the order status to delivered if the current status is
                shipped.
                <Select onValueChange={(e) => setStatus(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Shipped" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    updateOrders(orderId, status);
                    setOpen(false);
                  }}
                  variant="default"
                >
                  Submit
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <h1 className="text-3xl font-semibold">Your orders</h1>
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default Orders;
