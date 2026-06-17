"use client"

import Link from "next/link";

export default function UseFluxButton() {
    return (
        <Link
            href="/waitlist"
            className="btn-primary text-on-primary-container text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
            Use Onreco
        </Link>
    );
}