import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../common/comment";
import {Teacher} from "../common/teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  getAllUrl: string = environment.apiEndpoint + "/resource/teacher/get?teacherId=1";
  saveUrl: string = environment.apiEndpoint + "/resource/teacher/insert";
  deleteUrl:string = environment.apiEndpoint + "/resource/teacher/delete?id=";

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Teacher[]>(this.getAllUrl);
  }

  async save(teacher : Teacher){
    return await this.http.post(this.saveUrl, teacher, {responseType : 'text'}).toPromise();
  }
  delete(teacher : Teacher){
    return this.http.delete(this.deleteUrl + teacher.id,{responseType : 'text'}).toPromise()
  }
}
