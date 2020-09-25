import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error: any = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  public handleError(error: any): void {
    this.error = error.error.errors;
  }

  public handleResponse(data: any): any {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

}
