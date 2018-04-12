import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  notTrusted: boolean = false;
  returnUrl: string;
  message: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.login('')
      .then(success => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.notTrusted = true;
      });
  }
  login() {
    this.message = null;
    this.loading = true;
    this.authService.login(this.password)
      .then(success => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.message = error.error;
        this.loading = false;
      });
  }
}
