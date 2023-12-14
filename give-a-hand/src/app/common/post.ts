import {Profile} from "./profile";
import {Users} from "./users";

export class Post{
  id: number = 0;
  createdDateTime: Date | undefined;
  description: string = "";
  title: string = "";
  users_id: Users = new Users();
}
