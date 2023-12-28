import { IActivity, InputComment } from "@/app/types/types";
import prisma from "@/app/utils/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Props = {
    params: {
        id: string
    }
}

export async function DELETE(req: Response, {params}: Props) {
    try {
        const { userId } = auth();
        const { id } = params;

        if(!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        };

        const activity = await prisma.activity.delete({
            where: {
                id,
            }
        });
        console.log('activity deleted', id);
        return NextResponse.json({ activity })
    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}