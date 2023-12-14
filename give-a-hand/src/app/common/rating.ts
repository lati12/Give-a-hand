import {Parent} from "./parent";
import {Teacher} from "./teacher";

export class Rating{
  id: number = 0;
  created_date_time: Date | undefined;
  description: string = "";
  rate: number = 0;
  parent_id: Parent = new Parent();
  teacher_id: Teacher = new Teacher();
}
