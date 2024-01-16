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

export async function DELETE(req: Response, { params }: Props) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
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

export async function GET(req: Response, { params }: Props) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        };

        const activity = await prisma.activity.findUnique({
            where: {
                id,
            },
        });

        if (!activity) {
            return NextResponse.json({ error: "Activity not found", status: 404 });
        }

        return NextResponse.json(activity);
    } catch (error) {
        console.log("ERROR getting Activity by ID: ", error);
        return NextResponse.json({ error: "Error getting Activity by ID", status: 500 });
    }
};

export async function PUT(req: any, { params }: Props) {
    const { id } = params;
    const { userId } = auth();
    const { method } = req;
    let parsedReqBody = await new Response(req.body).json();

    try {
        const activity = await prisma.activity.findUnique({
            where: {
                id: String(id),
            },
        });

        if (!activity) {
            return NextResponse.json({ message: 'Activity not found' });
        }

        if (parsedReqBody.data.action == 'like') {
            activity.likes += 1;
        } else if (parsedReqBody.data.action == 'dislike') {
            activity.dislikes += 1;
        }

        //    else if (parsedReqBody.data.action == 'addBookmark') {
        //     console.log('userId addBookmark is', userId);
        //     console.log('activityId addBookmark is', id);
        //     const updateBookmark = await prisma.bookmark.create({
        //         data: {
        //             // @ts-ignore
        //             userId: userId,
        //             activityId: id
        //         },
        //     });
        //     console.log('added bookmark')
        //     return NextResponse.json({ updateBookmark });
        //   }
        //   else if (parsedReqBody.data.action == 'removeBookmark') {
        //     const updateBookmark = await prisma.bookmark.delete({
        //         where: {
        //             id,
        //         },
        //     });
        //     console.log('deleted bookmark')
        //     return NextResponse.json({ updateBookmark });
        //   } 

        else {
            return NextResponse.json({ message: 'Invalid action' });
        }

        const updatedActivity = await prisma.activity.update({
            where: {
                id: String(id),
            },
            data: {
                likes: activity.likes,
                dislikes: activity.dislikes,
            },
        });

        return NextResponse.json({ activity: updatedActivity });
    } catch (error) {
        console.error('Error managing likes/dislikes:', error);
        return NextResponse.json({ message: 'Internal server error' });
    }
}
