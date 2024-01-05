import { IActivity, InputComment } from "@/app/types/types";
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

// export async function PUT(
//     req: Request, { params }: Props
//     //req: NextApiRequest, res: NextApiResponse
//     ) {
//     const {
//         method,
//     } = req;
//     const { id } = params;


//     console.log('id server for like', id)
//     console.log('method server for like', method)

//     if(method !== "PUT") {
//         return NextResponse.json({ message: "Unsupported method" })
//     };

//     try {
//         const activity = await prisma.activity.findUnique({
//             where: {
//                 id: String(id),
//             },
//         });

//         console.log('req?.body', req?.body)

//         if (!activity) {
//             return NextResponse.json({ message: 'Activity not found' });
//           }

//         if(req?.body?.action === "like") {
//             activity.likes += 1;
//         } else if (req?.body?.action === "dislike") {
//             activity.likes -= 1;
//         } else {
//             return NextResponse.json({ message: 'Invalid action' });
//         };

//         const updatedActivity = await prisma.activity.update({
//             where: {
//                 id: String(id),
//             },
//             data: {
//                 likes: activity.likes,
//                 dislikes: activity.dislikes,
//             },
//         });

//         return NextResponse.json({ activity: updatedActivity });
//     } catch (error) {
//         console.error('Error managing likes/dislikes:', error);
//         return NextResponse.json({ message: 'Internal server error' });
//     }
// }

export async function PUT(req: any, { params }: Props) {
    let parsedReqBody = await new Response(req.body).json();

    if (req.method === 'PUT') {
        const { method } = req;
        const {id} = params;

        if (method !== 'PUT') {
            return NextResponse.json({ message: 'Unsupported method' });
        }

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
                activity.likes -= 1;
              } else {
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

    return NextResponse.json({ message: 'Method Not Allowed' });
}
