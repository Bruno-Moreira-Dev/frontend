import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from '../../Services/token.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
    ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    // console.log(this.form);

    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  public handleResponse(data: any): any {
    this.Token.handle(data.access_token);
    console.log(localStorage.getItem('token'));
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  public handleError(error: any): any {
    this.error = error.error.error;
  }

}
