export interface IActivity {
    id?: string
    title: string;
    description: string | null;
    category?: string | null;
    city: string;
    image: string | null;
    date: string;
    dateList: any[];
    likes: number;
    dislikes: number;
    comments: InputComment[]; 
    createdAt?: Date; 
    updatedAt?: Date;
    userId?: string
}

export interface IBookmark {
    id?: string
    userId: string | null
    activityId: string | null
}

export interface InputComment {
    content: string
    createdAt: Date
    activityId: string
    userId: string
}