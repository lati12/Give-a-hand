import {Educationtype} from "./educationtype";
import {Teacher} from "./teacher";

export class Teachereducation{
  id: number = 0;
  attachment: any = "";
  created_date_time: Date | undefined;
  description: any = "";
  education_type_id: Educationtype = new Educationtype();
  teacher_id : Teacher = new Teacher();
}
