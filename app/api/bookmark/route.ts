import prisma from "@/app/utils/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Response) {
    try {
        const { userId } = auth();
        
        if(!userId) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401 });
        };

        const allBookmarks = await prisma.bookmark.findMany();
        return NextResponse.json(allBookmarks)
    } catch (error) {
        console.log("ERROR getting Bookmarks: ", error);
        return NextResponse.json({ error: "Error getting Activity" }, {status: 500 });
    }
}