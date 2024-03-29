import { IActivity, InputComment } from "@/app/types/types";
import prisma from "@/app/utils/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import multer from "multer";

// const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Response) {
    try {
        const { userId } = auth();

        if(!userId) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401 });
        };

        const { title, description, category, city, image, date, dateList, likes, dislikes, comments, createdAt, updatedAt }: IActivity = await req.json();

        if(!title || !description || !city) {
            return NextResponse.json({ error: "Missing fields"} , {status: 400 })
        };

        const activity = await prisma.activity.create({
            data: {
                title,
                description,
                category,
                city,
                image, 
                date,
                dateList,
                likes,
                dislikes,
                comments: {
                    create: comments.map((comment: InputComment) => ({
                        content: comment.content,
                        userId: comment.userId,
                        createdAt: comment.createdAt
                    }))
                },
                userId
            }
        });

        console.log('activity created element', activity);

        return NextResponse.json(activity);
    } catch (error) {
        console.log("ERROR CREATING Activity: ", error);
        return NextResponse.json({ error: "Error creating Activity"} , {status: 500 });
    }
}

export async function GET(req: Response) {
    try {
        const { userId } = auth();

        if(!userId) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401 });
        };

        const allActivities = await prisma.activity.findMany();
        return NextResponse.json(allActivities);
    } catch (error) {
        console.log("ERROR getting Activity: ", error);
        return NextResponse.json({ error: "Error getting Activity" }, {status: 500 });

    }
}