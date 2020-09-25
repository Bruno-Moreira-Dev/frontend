import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };

  constructor() { }

  public handle(token: any): void {
    this.set(token);
  }

  public set(token: any): void {
    localStorage.setItem('token', token);
  }

  public get(): any {
    return localStorage.getItem('token');
  }

  public remove(): void {
    localStorage.removeItem('token');
  }

  public isValid(): boolean {

    const token = this.get();

    if (token) {
      const payload: any = this.payload(token);

      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  public payload(token: string): void {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  public decode(payload: any): void {
    return JSON.parse(atob(payload));
  }

  public loggedIn(): boolean {
    return this.isValid();
  }

}
