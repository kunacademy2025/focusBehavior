"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { getStrapiId } from "@/utils";
import { encrypt } from "@/services";
import { routes } from "@/config";
import { PaymentActionLink } from "./PaymentLinkAction";

interface Payment {
  order_code: string;
  first_name: string;
  last_name: string;
  payment_status: string;
  total: number;
  payment_link: string;
  event_booking: {
    booking_date: string;
    ticket: {
      title: string;
    };
  };
}

export const TransactionTable = ({
  data,
  headers,
}: {
  data: Payment[];
  headers: {
    order: string;
    name: string;
    total: string;
    paymentStatus: string;
    date: string;
    title: string;
    action: string;
    retry: string;
  };
}) => {
  const [paymentEncryptId, setPaymentEncryptId] = useState("");

  useEffect(() => {
    const fetchEncryptedId = async () => {
      const paymentEncryptedId = await encrypt(getStrapiId(data).toString());
      setPaymentEncryptId(paymentEncryptedId);
    };

    fetchEncryptedId();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: "order_code",
        header: headers.order,
        size: 150,
      },
      {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        id: "full_name",
        header: headers.name,
        size: 200,
      },
      {
        accessorFn: (row) => formatPrice(row.total),
        id: "total",
        header: headers.total,
        size: 150,
      },
      {
        accessorKey: "event_booking.booking_date",
        header: headers.date,
        size: 150,
      },
      {
        accessorKey: "event_booking.ticket.title",
        header: headers.title,
        size: 250,
      },
      {
        accessorFn: (row) => <PaymentActionLink payment={row} />,
        header: headers.paymentStatus,
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
  });

  return <MaterialReactTable table={table} />;
};
