"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation"
import { ApiAlert } from "./api-alert";

interface ApiListProps {
    entityName:string,
    entityIdName:string
}
interface routeProps {
    method:string,
    variant:"public"|"admin",
    url:string
}


export const ApiList:React.FC<ApiListProps> =({
    entityName,
    entityIdName
})=>{
    const params=useParams();
    const origin=useOrigin();

    const baseUrl=`${origin}/api/stores/${params.storeId}`
    const routes:routeProps[]=[
        {   method:"GET",
            variant:"public",
            url:`${entityName}`
        },
        {
            method:"GET",
            variant:"public",
            url:`${entityName}/[${entityIdName}]`
        },
        {
            method:"POST",
            variant:"admin",
            url:`${entityName}`
        },
        {
            method:"PATCH",
            variant:"admin",
            url:`${entityName}/[${entityIdName}]`
        },
        {
            method:"DELETE",
            variant:"admin",
            url:`${entityName}/[${entityIdName}]`
        }
    ]
    return (
        <>
            {routes.map((route,i)=>(
                <ApiAlert 
                    key={i}
                    title={route.method}
                    variant={route.variant}
                    description={`${baseUrl}/${route.url}`}
                />
            ))}


        </>
    )
}