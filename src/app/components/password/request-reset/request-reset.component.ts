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
    private Notify: SnotifyService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.Notify.info('Espere...', { timeout: 5000 });
    this.Jarwis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.Notify.error(error.error.error)
    );
  }

  public handleResponse(res: any): void {
    this.Notify.success(res.data, { timeout: 0 });
    this.form.email = null;
  }

}
