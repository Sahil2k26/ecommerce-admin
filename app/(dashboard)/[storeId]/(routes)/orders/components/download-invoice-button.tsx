"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // adjust path if needed
import { DownloadIcon, EyeIcon, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

interface DownloadInvoiceButtonProps {
    orderId: string;


}

export const DownloadInvoiceButton: React.FC<DownloadInvoiceButtonProps> = ({ orderId }) => {
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `/api/stores/${params.storeId}/order/${orderId}/invoice`, // Adjust the URL as per your API structure
                {
                    responseType: "blob", // important to handle binary data (PDF)
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `invoice-${orderId}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Invoice generation failed:", error);
            alert("Failed to generate invoice");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2 justify-center">
            <Button
                variant={"outline"}
                onClick={handleDownload}
                disabled={loading}

            >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <DownloadIcon className="w-4 h-4" />
                )}
            </Button>
            <Button
                variant={"outline"}
                onClick={() => window.open(`/api/stores/${params.storeId}/order/${orderId}/invoice?preview=true`, "_blank")}
                disabled={loading}
            >
                <EyeIcon className="w-4 h-4" />
            </Button>


        </div>
    );
};
