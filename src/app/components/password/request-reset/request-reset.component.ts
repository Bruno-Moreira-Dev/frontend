import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  private error: any;

  constructor(
    private Jarwis: JarwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.Jarwis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  public handleResponse(res: any): void {
    console.log(res);
    this.form.email = null;
  }

}
