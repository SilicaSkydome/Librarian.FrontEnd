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
export interface IBookAdd{
  name: string,
  coverUrl: string,
  authorID: string,
  tags: string[],
  description: string
}
