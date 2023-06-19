export interface IReview {
  id: string;
  authorId: string;
  bookId: string;
  text: string;
}
export interface IReviewAdd {
  authorId: string;
  bookId: string;
  text: string;
}
