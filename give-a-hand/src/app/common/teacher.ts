import {Profile} from "./profile";
import {Users} from "./users";

export class Teacher{
  id: number = 0;
  created_date_time: Date | undefined;
  users_id: Users = new Users();
}
