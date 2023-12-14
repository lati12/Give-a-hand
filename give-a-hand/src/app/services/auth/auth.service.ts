import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "./token-storage.service";
import {firstValueFrom} from "rxjs";
import {RegisterRequest} from "../../common/register-request";
import {Users} from "../../common/users";
import {JwtHelperService} from "@auth0/angular-jwt";

const AUTH_API = environment.apiEndpoint + '/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.apiEndpoint + '/login';

  constructor(    private http: HttpClient,
                  private jwtHelper: JwtHelperService,
                  private tokenStorageService: TokenStorageService) { }

  async login(form: FormData) {
    try {
      let tokens = JSON.parse(
        <string> await firstValueFrom(this.http.post(this.loginUrl, form, {responseType: 'text', headers: {skip: 'true'}}))
      );
      this.tokenStorageService.saveAccessToken(tokens.access_token);
      return 200;
    } catch (exception) {
      throw exception;
    }
  }
  async register(user: RegisterRequest) {
    return await firstValueFrom(this.http
      .post(AUTH_API + "register", user, { responseType: 'text', headers: { skip: 'true' } }));
  }

  public getUser(): Users | null{
    if (this.isTokenExpired(this.tokenStorageService.getAccessToken())) {
      return {} as Users;
    } else {
      return this.jwtHelper.decodeToken(this.tokenStorageService.getAccessToken()!);
    }
  }

  isTokenExpired(token: string | null): boolean {
    if (!token || token === 'undefined') return true;

    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch (exception) {
      return true;
    }
  }
}
