import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const email = body?.email?.trim().toLowerCase();
        const website = body?.website; // Honeypot field

        // Silently reject bots
        if (website) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Validate email
        if (!email) {
            return NextResponse.json(
                { success: false, message: "Please enter your email address." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = Number(process.env.BREVO_LIST_ID);

        if (!apiKey || !listId) {
            console.error("Brevo environment variables are missing.");
            return NextResponse.json(
                { success: false, message: "Newsletter service is not configured." },
                { status: 500 }
            );
        }

        // 1. Check if the contact already exists in Brevo
        const checkResponse = await fetch(
            `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "api-key": apiKey,
                },
            }
        );

        if (checkResponse.ok) {
            const existingContact = await checkResponse.json();
            // Check if user is already in this specific list
            if (existingContact.listIds?.includes(listId)) {
                return NextResponse.json(
                    {
                        success: false,
                        alreadySubscribed: true,
                        message: "This email is already subscribed to our newsletter.",
                    },
                    { status: 409 }
                );
            }
        }

        // 2. Add or update the contact in your list
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                email,
                listIds: [listId],
                updateEnabled: true,
            }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Brevo API error:", data);
            return NextResponse.json(
                {
                    success: false,
                    message: data?.message || "Unable to subscribe right now.",
                },
                { status: response.status }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "You're subscribed.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}