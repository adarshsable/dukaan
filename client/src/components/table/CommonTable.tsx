import { FC } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Tooltip } from "@mui/material";
import { MdDelete } from "react-icons/md";

interface CommonTableProps {
  rows: any[];
  isLoading?: boolean;
  tableHeight?: string;
  enableDelete?: boolean;
  enableEditing?: boolean;
  enableViewDetails?: boolean;
  topToolbarComp?: React.ReactNode;
  columns: MRT_ColumnDef<any[]> | any;
  openDetailsModal?: (row: any) => void;
  openDeleteConfirmModal?: (row: any) => void;
}

const CommonTable: FC<CommonTableProps> = ({
  rows = [],
  columns = [],
  topToolbarComp,
  openDetailsModal,
  isLoading = false,
  tableHeight = "35rem",
  enableDelete = false,
  enableEditing = false,
  openDeleteConfirmModal,
  enableViewDetails = false,
}) => {
  const table = useMaterialReactTable({
    columns,
    data: rows,
    state: { isLoading },
    initialState: { density: "compact" },
    enableEditing,
    renderTopToolbarCustomActions: () => {
      return topToolbarComp;
    },
    renderRowActions: ({ row }) => (
      <div className="flex justify-center items-center">
        {enableDelete && (
          <Tooltip title="Delete">
            <div
              className="cursor-pointer hover:bg-slate-50 p-3 rounded-full"
              onClick={() =>
                openDeleteConfirmModal ? openDeleteConfirmModal(row) : null
              }
            >
              <MdDelete className="text-red-400 text-2xl" />
            </div>
          </Tooltip>
        )}
        {enableViewDetails && (
          <Tooltip title="View Details">
            <button
              className="cursor-pointer text-white bg-indigo-500 hover:bg-indigo-400 p-2 rounded-sm shadow-md"
              onClick={() => (openDetailsModal ? openDetailsModal(row) : null)}
            >
              more
            </button>
          </Tooltip>
        )}
      </div>
    ),
    muiTableContainerProps: { sx: { height: tableHeight } },
    muiTablePaperProps: {
      elevation: 0,
      sx: { border: "0.15px solid gray" },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonTable;
