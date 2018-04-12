import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loginObserver: Observable<boolean>;
  public trustedObserver: Observable<boolean>;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loginObserver = this.auth.loginObserver;
    this.trustedObserver = this.auth.trustedObserver;
  }

}
