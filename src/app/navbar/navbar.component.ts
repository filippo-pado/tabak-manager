import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loginObserver: Observable<boolean>;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loginObserver = this.auth.loginObserver;
  }

}
