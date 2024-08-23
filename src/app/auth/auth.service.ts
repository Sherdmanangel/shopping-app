import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

export interface AuthResponseData {
  username: string;
  jwt: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private jwtExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8080/auth/authenticate',
        {
          username: username,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.username,
            resData.jwt,
            +resData.expiresIn
          );
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8080/auth/authenticate',
        {
          username: username,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.username,
            resData.jwt,
            +resData.expiresIn
          );
        })
      );
  }
  autoLogin() {
    const userData: {
      username: string;
      _jwt: string;
      _jwtExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData._jwt,
      new Date(userData._jwtExpirationDate)
    );

    if (loadedUser.jwt) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._jwtExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.jwtExpirationTimer) {
      clearTimeout(this.jwtExpirationTimer);
    }
    this.jwtExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.jwtExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    jwt: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, jwt, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    let err = new Error(errorMessage);
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => err);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This username exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This username does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    err = new Error(errorMessage);
    return throwError(() => err);
  }
}



