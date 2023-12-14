import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {EMPTY, Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public static AUTH_BEARER = 'Bearer ';

  private access_token: string | null;
  private refresh_token: string | null;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.access_token = null;
    this.refresh_token = null;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.access_token = this.tokenStorageService.getAccessToken();

    if (request.headers.get('skip')) {
      return next.handle(request);
    }

    if (!this.authService.isTokenExpired(this.access_token)) {
      request = AuthInterceptor.setRequestHeader(request, this.access_token!);
      return next.handle(request);
    } else {
      this.router.navigate(['login']).catch(console.error);
      return EMPTY;
    }
  }

  private static setRequestHeader(req: HttpRequest<any>, token: string) {
    req = req.clone({
      setHeaders: {
        Authorization: AuthInterceptor.AUTH_BEARER + token,
      },
    });
    return req;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
