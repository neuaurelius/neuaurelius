"use client";

import Link from "next/link";
import Nav from "@/app/Nav";
import "./404.css";
export default function NotFound() {
    return (
        <>
            <Nav />

            <main className="nf-page">
                <div className="nf-content">
                    <h1 className="nf-code">404</h1>

                    <h2 className="nf-heading">
                        We couldn&apos;t find that page
                    </h2>

                    <p className="nf-subtext">
                        The page you&apos;re looking for doesn&apos;t exist or
                        has been moved.
                    </p>

                    <Link href="/" className="nf-home-btn">

                        <span>Back to Homepage</span>
                    </Link>
                </div>
            </main>
        </>
    );
}
