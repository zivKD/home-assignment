
export interface IPost {
    id: number;
    userId: number;
    date: Date;
    content: string;
    imageUrl?: URL;
    likeCounter: number;
}