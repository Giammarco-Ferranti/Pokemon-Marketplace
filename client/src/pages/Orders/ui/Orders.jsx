import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import * as S from "./Orders.classes.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
} from "@/components/ui/drawer";
import useWindowDimensions from "@/hooks/useWindowWidth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/Layouts";
import { useOrdersLogic } from "../Logic/useOrdersLogic";
import { toast } from "sonner";

const columnHelper = createColumnHelper();

const Orders = () => {
  const {
    open,
    setOpen,
    orderId,
    setOrderId,
    setProductId,
    status,
    setStatus,
    openDialog,
    setOpenDialog,
    getOrders,
    handleDelete,
    updateOrders,
  } = useOrdersLogic();
  const { width } = useWindowDimensions();
  const columns = [
    columnHelper.accessor("index", {
      id: ({ row }) => {
        row.order_id;
      },
      header: () => "#",
      cell: ({ row }) => {
        return (
          <h3 className="text-gray-500" key={row.order_id}>
            {row.index + 1}
          </h3>
        );
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
            <h1
              className={
                row.original.order_status === "Shipped"
                  ? S.statusShipped
                  : S.statusDelivered
              }
            >
              {row.original.order_status}
            </h1>
            {row.original.order_status === "Shipped" ? (
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
            ) : null}
          </div>
        );
      },
    }),
    columnHelper.accessor("delete", {
      id: "delete",
      header: () => "",
      cell: ({ row }) => {
        return row.original.order_status === "Shipped" ? (
          <svg
            key={row.order_id}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500 cursor-pointer"
            onClick={() => {
              setOpenDialog(true);
              setOrderId(row.original.order_id);
              // console.log(row.original.product_id);
              setProductId(row.original.product_id);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        ) : null;
      },
    }),
  ];

  return (
    <div className={S.ordersWrapper}>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete.mutate(orderId);
                setOpenDialog(false);
                toast("Order deleted");
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {width < 990 ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className={S.drawerContent}>
            <DrawerHeader className={S.drawerHeader}>
              <DrawerTitle>Change order status</DrawerTitle>
              <DrawerDescription className={S.drawerDescription}>
                Change the order status to delivered if the current status is
                shipped.
                <Select onValueChange={(e) => setStatus(e)}>
                  <SelectTrigger className={S.selectTrigger}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className={S.drawerFooter}>
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
          <DialogContent className={S.dialogContent}>
            <DialogHeader>
              <DialogTitle>Change order status</DialogTitle>
              <DialogDescription>
                Change the order status to delivered if the current status is
                shipped.
                <Select onValueChange={(e) => setStatus(e)}>
                  <SelectTrigger className={S.selectTrigger}>
                    <SelectValue placeholder="Status" />
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

      <h1 className={S.orderTitle}>Your orders</h1>

      {getOrders.data ? (
        <DataTable columns={columns} data={getOrders.data} />
      ) : null}
    </div>
  );
};

export default Orders;
