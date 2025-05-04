"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import toast from "react-hot-toast"

interface ApiAlertProps {
    title:string,
    description:string,
    variant:"public" | "admin"
}

const textMap:Record<ApiAlertProps["variant"],string> ={
    public:"Public",
    admin:"Admin"
}

const VariantMap:Record<ApiAlertProps["variant"],"outline"| "secondary" | "destructive" |"default"> ={
    public:"secondary",
    admin:"destructive"
}

export const ApiAlert:React.FC<ApiAlertProps>= ({
    title,
    description,
    variant="public"
})=>{
    const onCopy=()=>{
        navigator.clipboard.writeText(description);

        toast.success("API Route Copied Successfully");
    }

    return <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-x-2">
            {title}
            <Badge variant={VariantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between ">
            <code className=" max-w-[60vw] sm:max-w-[70vw] lg:max-w-fit text-left relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs lg:text-sm font-semibold overflow-auto">
                {description}
            </code>
            <Button variant={"outline"} size={"icon"} onClick={onCopy} className="shrink-0 ">
                <Copy className="h-4 w-4" />

            </Button>
        </AlertDescription>
    </Alert>

}
