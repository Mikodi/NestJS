export class Comment {
  id: number;
  author: string;
  text: string;
  comments?: AnswerToComment[];
  addFile?: string;
  date: string;
  attachments?: [string];
}

export class AnswerToComment {
  id: number;
  author: string;
  text: string;
  date: string;
}
