export interface IActivity {
    id?: string
    title: string | null;
    description: string | null;
    city: string | null;
    image: string | null;
    date: string;
    dateList: any[];
    likes: number;
    comments: InputComment[]; 
    createdAt?: Date; 
    updatedAt?: Date;
}

export interface InputComment {
    content: string
    createdAt: Date
    activityId: string
    userId: string
}