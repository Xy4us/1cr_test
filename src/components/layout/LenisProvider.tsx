"use client";
import { useLenis } from "@/lib/lenis";

export default function LenisProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useLenis();
    return <>{children}</>;
}
