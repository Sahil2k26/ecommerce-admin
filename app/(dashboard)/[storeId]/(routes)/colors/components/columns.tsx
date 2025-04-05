"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"
import { Square } from "lucide-react"

export type  colorColumns= {
  id: string
  name:string
  value:string
  createdAt:string

}

export const columns: ColumnDef<colorColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey:"value",
    header:"Value",
    cell:({row})=>{
      // console.log("row data" ,row.original);
      
      return <div className="flex items-center gap-x-2">
                  <Square fill={row.original.value} ></Square>
                  <span>{row.original.value}</span>
              </div>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"actions",
    cell:({row})=> <CellAction data={row.original} />
  }
  
]
