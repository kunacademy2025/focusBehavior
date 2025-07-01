"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import moment from "moment";
import { Button } from "rizzui";
import { EventAttendanceApis } from "@/services/api/collections/event-attendance";
import toast from "react-hot-toast";

interface AttendanceRecord {
  id: number;
  checked_in_at: string;
  checked_out_at: string;
}

interface UserAttendance {
  id: number;
  first_name: string;
  last_name: string;
  check_ins: AttendanceRecord[];
}

export const EventAttendanceTable = ({ data }: { data: UserAttendance[] }) => {
  const handleCheckOut = async (id: number) => {
    try {
      const response = await EventAttendanceApis.put(id, {
        data: {
          checked_out_at: new Date(),
        },
      });

      if (response) {
        toast.success("Checked out successfully!");
        window.location.reload()
      }
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<UserAttendance>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 150,
      },
    ],
    []
  );

  const checkInColumns = useMemo<MRT_ColumnDef<AttendanceRecord>[]>(
    () => [
      {
        accessorKey: "checked_in_at",
        header: "Checked In",
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue()
            ? moment(cell.getValue()).format("DD MMM YYYY h:mm A")
            : "N/A",
      },
      {
        accessorKey: "checked_out_at",
        header: "Checked Out",
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue()
            ? moment(cell.getValue()).format("DD MMM YYYY h:mm A")
            : "Still In",
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        Cell: ({ row }) => {
          const checkInId = row.original.id;
          if (row.original.checked_out_at) {
            return null;
          }


          return (
            <Button
              variant="outline"
              onClick={() => handleCheckOut(checkInId)}
              className="px-6 uppercase "
            >
              Check Out
            </Button>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpanding: true,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "0",
      },
    },
    muiTableContainerProps: {
      sx: { maxHeight: "600px", boxShadow: "none" },
    },
    muiTableProps: {
      sx: {
        boxShadow: "none",
      },
    },
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      rowsPerPageOptions: [50, 100, 200],
      color: "primary",
      shape: "rounded",
      variant: "outlined",
    },
    getSubRows: (row) =>
      row.check_ins?.map((ci) => ({ ...ci, isSubRow: true, id: row.id })) || [],
    renderDetailPanel: ({ row }) =>
      row.original.isSubRow ? null : (
        <div className="p-2">
          {row.original.check_ins && row.original.check_ins.length > 0 ? (
            <MaterialReactTable
              columns={checkInColumns}
              data={
                row.original.check_ins?.map((ci) => ({
                  ...ci,
                  id: ci.id,
                })) || []
              }
              enablePagination={false}
              muiTablePaperProps={{
                elevation: 0,
                sx: {
                  borderRadius: "0",
                },
              }}
              muiTableContainerProps={{
                sx: { maxHeight: "600px", boxShadow: "none" },
              }}
              muiTableProps={{
                sx: {
                  boxShadow: "none",
                },
              }}
            />
          ) : (
            <p>No check-in records found.</p>
          )}
        </div>
      ),
  });

  return <MaterialReactTable table={table} />;
};
