"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // wait for client-side hydration
    }, []);

    if (!mounted) {
        // Prevent rendering until theme is available
        return null;
    }

    return (
        <ClerkProvider
            appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
            }}
        >
            {children}
        </ClerkProvider>
    );
}
