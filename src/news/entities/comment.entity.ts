export class Comment {
  id: number;
  author: string;
  text: string;
  comments?: AnswerToComment[];
  date: string;
}

export class AnswerToComment {
  id: number;
  author: string;
  text: string;
  date: string;
}
