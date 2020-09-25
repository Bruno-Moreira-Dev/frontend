import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null
  };

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  public handleResponse(data: any): any {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('');
  }

  public handleError(error: any): any {
    this.error = error.error.error;
  }

}
