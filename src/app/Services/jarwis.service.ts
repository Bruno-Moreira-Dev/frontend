import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  public signup(data: any): any {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  public login(data: any): any {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  public sendPasswordResetLink(data: any): any {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }
  public changePassword(data: any): any {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

}
