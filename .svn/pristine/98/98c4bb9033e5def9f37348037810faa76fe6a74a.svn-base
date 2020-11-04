import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public setSession(data: any) {

    localStorage.setItem('userSession', JSON.stringify(data));

  }

  public setSessionToken(data: any) {

    localStorage.setItem('authorizationData', JSON.stringify(data));

  }

  public setUserData(data: any) {

    localStorage.setItem('userData', JSON.stringify(data));

  }

  public getSession() {

    if (localStorage.getItem('userSession') != null) {

      return JSON.parse(localStorage.getItem('userSession'));

    } else {

      return null;
    }

  }

  public getSessionToken() {

    if (localStorage.getItem('authorizationData') != null) {

      return JSON.parse(localStorage.getItem('authorizationData'));

    } else {

      return null;
    }

  }

  public getUserData() {

    if (localStorage.getItem('userData') != null) {

      return JSON.parse(localStorage.getItem('userData'));

    } else {

      return null;
    }

  }

  public removeSession() {

    localStorage.removeItem('userSession');

  }

  public removeSessionToken() {

    localStorage.removeItem('authorizationData');

  }

  public removeUserData() {

    localStorage.removeItem('userData');

  }
}
