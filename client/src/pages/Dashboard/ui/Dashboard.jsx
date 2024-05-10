import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import gif from "../../../assets/blastoise-mega.gif";
import { DataTable, Grid } from "@/Layouts";
import { useDashboardLogic } from "../Logic/useDashboardLogic";
import * as S from "./Dashboard.classes.js";

const columnHelper = createColumnHelper();

function Dashboard() {
  const { mostValuable, bestUsers } = useDashboardLogic();
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
  const navigate = useNavigate();

  return (
    <>
      <div className={S.heroWrapper}>
        <div className={S.heroContent}>
          <div className={S.heroImageWrapper}>
            <img src={gif} className={S.heroImage} alt="hero-gif" />
          </div>
          <div className={S.heroTextWrapper}>
            <h3 className={S.heroTextTitle}>Gotta catch 'em all.</h3>
            <p className={S.heroTextDescription}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <Button>Explore</Button>
          </div>
        </div>
      </div>

      <Grid img={mostValuable} title={"Best"} />
      <Button
        onClick={() => navigate("/explore/all")}
        variant="outline"
        className="rounded-full"
        size="icon"
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
