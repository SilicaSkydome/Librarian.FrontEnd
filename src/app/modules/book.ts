export interface IBook {
    id: string,
    name: string,
    authorId: string,
    coverUrl: string | null,
    date: Date,
    symbols: number,
    description: string,
    tags: string[]
};