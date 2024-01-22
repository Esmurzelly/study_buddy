import prisma from "@/app/utils/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from '@clerk/nextjs';

export async function GET(req: Response) {
    try {
        const { userId } = auth();
        const users = await clerkClient.users.getUserList({
            orderBy: '-created_at',
        });

        if(!userId) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401 });
        };

        // const allActivities = await prisma.activity.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.log("ERROR getting Activity: ", error);
        return NextResponse.json({ error: "Error getting Activity" }, {status: 500 });

    }
}