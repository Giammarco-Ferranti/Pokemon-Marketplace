import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import gif from "../../../assets/blastoise-mega.gif";
import { DataTable, Grid } from "@/Layouts";
import { useDashboardLogic } from "../Logic/useDashboardLogic";
import * as S from "./Dashboard.classes.js";
import verifiedIcon from "../../../assets/hexagon-check.svg";

const columnHelper = createColumnHelper();

function Dashboard() {
  const { mostValuable, bestUsers } = useDashboardLogic();
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
  const navigate = useNavigate();

  return (
    <>
      <div className={S.heroWrapper}>
        <div className={S.heroContent}>
          <div className={S.heroImageWrapper}>
            <img src={gif} className={S.heroImage} alt="hero-gif" />
          </div>
          <div className={S.heroTextWrapper}>
            <h5 className={S.heroCallToaction}>
              Check the best{" "}
              <span className={S.heroCallToactionSpan}>collections</span>
            </h5>
            <h3 className={S.heroTextTitle}>Gotta catch 'em all. 👾 </h3>
            <p className={S.heroTextDescription}>
              The best cards in the world are avaible here.
            </p>
            <Button variant="default" onClick={() => navigate("/explore/all")}>
              Explore
            </Button>
          </div>
        </div>
      </div>

      <Grid img={mostValuable} title={"Rarest"} button={true} />

      <DataTable
        columns={columns}
        data={bestUsers.data ? bestUsers.data.slice(0, 5) : []}
        title={"Best Users"}
      />
    </>
  );
}

export default Dashboard;
