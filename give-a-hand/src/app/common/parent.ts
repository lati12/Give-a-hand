import {Profile} from "./profile";
import {Users} from "./users";

export class Parent{
  id: number = 0;
  created_date_time: Date | undefined;
  users_id: Users = new Users()
}
