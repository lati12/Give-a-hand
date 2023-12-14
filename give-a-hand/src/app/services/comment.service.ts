import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../common/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  getAllUrl: string = environment.apiEndpoint + "/resource/comment/get";
  saveUrl: string = environment.apiEndpoint + "/resource/comment/insert";
  deleteUrl:string = environment.apiEndpoint + "/resource/comment/delete?id=";

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Comment[]>(this.getAllUrl);
  }

  async save(comment : Comment){
    return await this.http.post(this.saveUrl, comment, {responseType : 'text'}).toPromise();
  }
  delete(comment : Comment){
    return this.http.delete(this.deleteUrl + comment.id,{responseType : 'text'}).toPromise()
  }
}
