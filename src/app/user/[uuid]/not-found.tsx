"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.push('/')
    }, [])

    return (
        <h1>Резюме не найдено</h1>
    )
}
