"use client"

import StoreModal from "@/components/modals/store-modal";
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null; // it will not render anything until the component is mounted
    // thus on SSR it will not render anything
    // thus it will not cause unknown issues like hydration mismatch

    return (
        <>
            <StoreModal />
        </>
    )


}