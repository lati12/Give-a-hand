import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Parent} from "../common/parent";

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  getAllUrl: string = environment.apiEndpoint + "/resource/parent/get?id=1";
  saveUrl: string = environment.apiEndpoint + "/resource/parent/insert";
  deleteUrl : string = environment.apiEndpoint + "/resource/parent/delete?id="


  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Parent[]>(this.getAllUrl);
  }

  async save(parent : Parent){
    return await this.http.post(this.saveUrl, parent, {responseType: 'text'}).toPromise();
  }
  delete(parent : Parent){
    return this.http.delete(this.deleteUrl+ parent.id,{responseType : 'text'}).toPromise()
  }
}
