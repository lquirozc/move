import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceBase: string = environment.urlAPI;
  clientId: string = environment.clientId;

  constructor(private httpClient: HttpClient, private sessionServices: SessionService,
    private apiService: ApiService, private router: Router) { }

  httpOptionsTokenize = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    })
  }

  _login = function (loginData: any) {

    const pwd = encodeURIComponent(loginData.password);
    let data: string;

    data = "grant_type=password&username=" + loginData.userName + "&password=" + pwd + "&typeApplication=" + loginData.typeApplication;


    if (loginData.useRefreshTokens) {
      data = data + "&client_id=" + this.clientId;
    }

    let promise = new Promise((resolve, reject) => {

      this._HttpGetTokenize(data).subscribe((res) => {

        const pss = btoa(loginData.password);
        const accountInfo = {

          'username': loginData.userName,
          'password': pss,
        }

        this.sessionServices.setSession(accountInfo);

        if (loginData.useRefreshTokens) {
          this.sessionServices.setSessionToken({ token: res.accessToken, refreshToken: res.refresh_token, useRefreshTokens: true });
        }
        else {
          this.sessionServices.setSessionToken({ token: res.accessToken, refreshToken: "", useRefreshTokens: false });
        }

        resolve(res);
      });
    });

    return promise
  }

  _HttpGetTokenize(data: any) {
    return this.httpClient.post(`${this.serviceBase}/token`, data, this.httpOptionsTokenize);
  }

  _logOut = function () {


    this.sessionServices.removeSessionToken();
    this.sessionServices.removeSession();
    this.sessionServices.removeUserData();
    localStorage.clear();

    this.router.navigate(['/']);
    //window.location.reload();//Reinit app


    // this.closeSessionFB();
    // this.closeSessionGoogle();

  }

  refreshToken() {

    const authData = this.sessionServices.getSessionToken();
    if (authData) {

      if (authData.useRefreshTokens) {

        const data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + this.clientId;

        //this.sessionServices.removeSessionToken();

        return this.httpClient.post<any>(`${this.serviceBase}/token`, data).pipe(tap((res) => {
          this.sessionServices.setSessionToken({ token: res.access_token, refreshToken: res.refresh_token, useRefreshTokens: true });
        }), catchError((error) => {

          this.logOut();

          return throwError('error-->>> Token expired ' + error);
        }));

      }
    }

  }

  public login = this._login;
  public logOut = this._logOut;

}
