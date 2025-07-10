"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PaymentBadge } from "./payment-badge"
import { OrderStatus, OrderType } from "@prisma/client"
import { OrderStatusBadge } from "./order-status-badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DownloadInvoiceButton } from "./download-invoice-button"
import { formatter } from "@/lib/utils"


export type OrderColumns = {
  id: string
  createdAt: string
  customerName: string
  isPaid: boolean
  total: number
  items: number
  status: OrderStatus
  orderType: OrderType
}

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium">
          #{row.original.id.slice(row.original.id.length - 4)}
        </span>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}

        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "customerName",
    header: "Customer"
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => {
      return PaymentBadge({
        isPaid: row.original.isPaid
      })
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {formatter.format(row.original.total)}
        </span>
      )
    }

  },
  {
    accessorKey: "items",
    header: "Items"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return OrderStatusBadge({
        status: row.original.status
      })
    }
  },
  {
    accessorKey: "orderType",
    header: "Order Type",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium italic ">
          {row.original.orderType.charAt(0).toUpperCase() + row.original.orderType.slice(1).toLocaleLowerCase()}
        </span>
      )
    }

  },
  {
    id: "actions",
    cell: ({ row }) => <DownloadInvoiceButton orderId={row.original.id} />
  }

]
