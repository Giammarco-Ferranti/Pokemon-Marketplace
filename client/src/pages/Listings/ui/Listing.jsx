import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useWindowDimensions from "@/hooks/useWindowWidth";
import { DataTable } from "@/Layouts";
import { useListingsLogic } from "../Logic/useListingsLogic";
import * as S from "./Listings.classes.js";
import FormListing from "./FormListing";
import plusSvg from "../../../assets/plus-svgrepo-com.svg";

const columnHelper = createColumnHelper();

const Listing = () => {
  const { width } = useWindowDimensions();
  const SUPABASE_BUCKET_URL =
    "https://lcifhlixvidmtkylidkx.supabase.co/storage/v1/object/public/";
  const {
    productId,
    openDialog,
    open,
    setOpen,
    openUpdate,
    setOpenUpdate,
    getData,
    setOpenDialog,
    setProductId,
    handleDelete,
  } = useListingsLogic();
  const columns = [
    columnHelper.accessor("index", {
      id: "index",
      enableSorting: false,
      header: () => "#",
      cell: ({ row }) => {
        return <h3>{row.index + 1}</h3>;
      },
    }),
    columnHelper.accessor("img_path", {
      id: "Image",
      enableSorting: false,
      header: () => "Image",
      cell: ({ row }) => {
        console.log(row.original.img_path);
        return (
          <img
            src={`${SUPABASE_BUCKET_URL}${row.original.img_path}`}
            // src="https://lcifhlixvidmtkylidkx.supabase.co/storage/v1/object/public/Pokemon/Images/Rapidash.webp"
            className="w-10"
          />
        );
      },
    }),
    columnHelper.accessor("name", {
      id: "Name",
      enableSorting: false,
      header: () => "Name",
      cell: ({ row }) => {
        return <h3>{row.original.name}</h3>;
      },
    }),
    columnHelper.accessor("description", {
      id: "description",
      enableSorting: false,
      header: () => "Description",
      cell: ({ row }) => {
        return (
          <p className="truncate w-40 md:w-full">{row.original.description}</p>
        );
      },
    }),
    columnHelper.accessor("price", {
      id: "price",
      enableSorting: false,
      header: () => "Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      id: "status",
      enableSorting: false,
      header: () => "Status",
      cell: ({ row }) => {
        return (
          <p
            className={
              row.original.status === "Available"
                ? S.statusAvailable
                : S.statusSold
            }
          >
            {row.original.status}
          </p>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      enableSorting: true,
      header: () => {
        return (
          <div className="flex flex-row">
            <h3>Created</h3>
          </div>
        );
      },
      cell: ({ row }) => {
        return new Date(row.original.created_at).toLocaleDateString();
      },
    }),
    columnHelper.accessor("update", {
      id: "update",
      enableSorting: false,
      header: () => "",
      cell: ({ row }) => {
        return row.original.status !== "sold" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 hover:cursor-pointer"
            onClick={() => {
              setOpenUpdate(true);
              setProductId(row.original.id);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        ) : null;
      },
    }),
    columnHelper.accessor("delete", {
      id: "delete",
      enableSorting: false,
      header: () => "",
      cell: ({ row }) => {
        return row.original.status !== "sold" ? (
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
              setProductId(row.original.id);
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
    <div className={S.listingsWrapper}>
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
                handleDelete.mutate();
                setOpenDialog(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {width < 990 ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className={S.drawerContentWrapper}>
            <FormListing type={"upload"} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={S.dialogContentWrapper}>
            <FormListing type="upload" />
          </DialogContent>
        </Dialog>
      )}

      {width < 990 ? (
        <Drawer open={openUpdate} onOpenChange={setOpenUpdate}>
          <DrawerContent className={S.drawerContentWrapper}>
            <FormListing type={"update"} productId={productId} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
          <DialogContent className={S.dialogContentWrapper}>
            <FormListing type={"update"} productId={productId} />
          </DialogContent>
        </Dialog>
      )}

      <div className={S.titleWrapper}>
        <h1 className={S.listingsTitle}>Your Listings</h1>

        <Button onClick={() => setOpen(true)} size="icon">
          <img src={plusSvg} alt="plus-icon" className="w-5" />
        </Button>
      </div>
      <DataTable columns={columns} data={getData.data ? getData.data : []} />
    </div>
  );
};

export default Listing;
