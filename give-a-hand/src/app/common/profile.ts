import {Users} from "./users";

export class Profile{
  id: number = 0;
  address: string = "";
  city: string = "";
  created_date_time: Date | undefined;
  description: string = "";
  last_name: string = "";
  name: string = "";
  users_id : Users = new Users();
}
