import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const email = body?.email?.trim().toLowerCase();

        // Honeypot field for basic bot protection
        const website = body?.website;

        // Silently reject bots
        if (website) {
            return NextResponse.json(
                { success: true },
                { status: 200 }
            );
        }

        // Validate email
        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter your email address.",
                },
                { status: 400 }
            );
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address.",
                },
                { status: 400 }
            );
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = Number(process.env.BREVO_LIST_ID);

        if (!apiKey || !listId) {
            console.error("Brevo environment variables are missing.");

            return NextResponse.json(
                {
                    success: false,
                    message: "Newsletter service is not configured.",
                },
                { status: 500 }
            );
        }

        const response = await fetch(
            "https://api.brevo.com/v3/contacts",
            {
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
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Brevo API error:", data);

            // Contact already exists / other Brevo response
            if (
                data?.code === "duplicate_parameter" ||
                data?.code === "duplicate"
            ) {
                return NextResponse.json(
                    {
                        success: true,
                        message: "You're already subscribed.",
                    },
                    { status: 200 }
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    message:
                        data?.message ||
                        "Unable to subscribe right now. Please try again.",
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
                message:
                    "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}