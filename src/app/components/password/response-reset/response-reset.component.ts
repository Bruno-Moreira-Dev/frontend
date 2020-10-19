import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

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
    private router: Router,
    private Notify: SnotifyService
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

    const routerMessage = this.router;
    this.Notify.confirm('Feito!', 'Agora realize o login com a nova senha.', {
      buttons: [
        {
          text: 'Ok',
          action: toster => {
            routerMessage.navigateByUrl('/login'),
              this.Notify.remove(toster.id);
          }
        },
      ]
    });

    // this.router.navigateByUrl('/login');
  }

  public handleError(error: any): any {
    this.error = error.error.errors;
  }

}
