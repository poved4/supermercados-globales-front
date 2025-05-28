import { BehaviorSubject, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageServiceService } from './local-storage-service.service';
import { environment as env } from '../../environments/environment';
import { SignInResponse } from '../interfaces/sign-in-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private storage = inject(LocalStorageServiceService);

  private authenticated = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated$: Observable<boolean> = this.authenticated.asObservable();

  getAuthenticated(): boolean {
    return this.authenticated.getValue();
  }

  setAuthenticated(newValue: boolean) {
    console.log(newValue);
    this.authenticated.next(newValue);
  }

  sessionValidation(): Observable<any> {

    const token = this.storage.getItem(env.storage.accessToken);
    this.setAuthenticated(token !== null && token.length > 0);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${env.apiUrl}/api/v1/auth`,
      { headers }
    );

  }

  logOut(): Observable<any> {

    const jwt = JSON.parse(
      this.storage.getItem(env.storage.accessToken)!
    );

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.post<any>(
      `${env.apiUrl}/api/v1/auth/logOut`,
      null,
      { headers }
    )
      .pipe(
        tap(body => {
          this.storage.removeItem(env.storage.accessToken);
          this.setAuthenticated(false);
        })
      );

  }

  signIn(email: string, password: string): Observable<SignInResponse> {

    const requestBody = {
      "email": email,
      "password": password,
      "ipAddress": "127.0.0.1",
      "deviceUsed": "my laptop"
    };

    return this.http.post<any>(
      `${env.apiUrl}/api/v1/auth/signIn`,
      requestBody
    )
      .pipe(
        tap(body => {

          this.storage.setItem(
            env.storage.accessToken,
            JSON.stringify(body.accessToken)
          );

          this.setAuthenticated(body.accessToken.length > 0);

        })
      );

  }

}
