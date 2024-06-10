
export interface IPost {
    id: number;
    userId: number;
    date: string;
    content: string;
    imageUrl?: string;
    likeCounter: number;
}

export type PartialPost = {id: number} & Partial<IPost>;