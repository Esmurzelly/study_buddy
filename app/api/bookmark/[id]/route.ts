import { IActivity, IBookmark, InputComment } from "@/app/types/types";
import prisma from "@/app/utils/client";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Props = {
    params: {
        id: string
        action?: string
    }
}

export async function PUT(req: Response, { params }: Props) {
    const { id } = params;
    const { userId } = auth();
    let parsedReqBody = await new Response(req.body).json();

    try {
        if (parsedReqBody.data.action == 'addBookmark') {
            console.log('userId addBookmark is', userId);
            console.log('activityId addBookmark is', id);
            const updateBookmark = await prisma.bookmark.create({
                data: {
                    // @ts-ignore
                    userId: userId,
                    activityId: id
                },
            });
            console.log('added bookmark')
            return NextResponse.json({ updateBookmark });
          } else {
            return NextResponse.json({ message: 'Invalid action' });
        }
    } catch (error) {
        
    }
}

export async function DELETE(req: Response, { params }: Props) {
    let parsedReqBody = await new Response(req.body).json();
    console.log('parsedReqBody bookmark', parsedReqBody.action)
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        };

        if (parsedReqBody.action == 'removeBookmark') {
            const updateBookmark = await prisma.bookmark.deleteMany({
                where: {
                    userId: userId,
                    activityId: id
                },
            });
            console.log('deleted bookmark')
            return NextResponse.json({ updateBookmark });
          } 
    } catch (error) {
        console.log("ERROR DELETING BOOKMARK: ", error);
        return NextResponse.json({ error: "Error deleting bookmark", status: 500 });
    }
}