import {Post} from "./post";

export class Comment{
  id: number = 0;
  comment_text: string = "";
  created_date_time: Date | undefined;
  post_id: Post = new Post();
}
