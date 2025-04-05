"use client"

import { ColumnDef } from "@tanstack/react-table"

export type  OrderColumns= {
  id: string
  phone:string
  address:string
  products:string
  isPaid:boolean
  totalPrice:string

  createdAt:string

}

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
  
]
