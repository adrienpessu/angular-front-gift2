import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const url = urlAfterRedirects.split(';')[0];
        this.isLogin = url === '/login';
        console.log(url);
      });
  }

  disconnect() {
    this.loginService.deleteToken();
    this.router.navigate(['/login']);
  }



  ngOnInit() {
  }

}
