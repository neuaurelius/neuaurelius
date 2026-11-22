import { headers } from "next/headers";
import Homepage from "./Hompage";

export const revalidate = 60;

export default async function Home() {
    const headerList = await headers();
    const userAgent = headerList.get("user-agent");
    if (!userAgent || userAgent.length < 8) {
        return null;
    }

    return <Homepage />;
}
