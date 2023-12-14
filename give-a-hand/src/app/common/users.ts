import {Role} from "./Role";

export class Users{
  id: number = 0;
  password: string = "";
  type: number = 0;
  email: string = "";
  created_date_time: Date | undefined;
  emailConfirmed:boolean = false;
  enabled:boolean = false;

  roles: Role[] = [];

}
