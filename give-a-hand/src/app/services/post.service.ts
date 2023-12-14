import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../common/comment";
import {Post} from "../common/post";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  getAllUrl: string = environment.apiEndpoint + "/resource/post/get?postId=1";
  saveUrl: string = environment.apiEndpoint + "/resource/post/insert";
  deleteUrl:string = environment.apiEndpoint + "/resource/post/delete?id=";

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Post[]>(this.getAllUrl);
  }

  async save(post : Post){
    return await this.http.post(this.saveUrl, post, {responseType : 'text'}).toPromise();
  }
  delete(post : Post){
    return this.http.delete(this.deleteUrl + post.id,{responseType : 'text'}).toPromise()
  }
}
