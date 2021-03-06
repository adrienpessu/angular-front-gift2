import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReferentielService } from '../shared/service/referentiel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  isLoginAdmin = false;

  childs = [];
  menuName = '';

  constructor(private loginService: LoginService, private router: Router, private referentielService: ReferentielService) {
    this.childs = this.referentielService.getChilds();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const url = urlAfterRedirects.split(';')[0];
        this.isLogin = url.startsWith('/login');
        this.isLoginAdmin = url.startsWith('/login/admin');
        this.childs.forEach(menu => {
          if (menu.link === '/list') {
            this.router.navigate(['/list', this.referentielService.getChilds()[0].id]);
          } else {
            menu.active = urlAfterRedirects === `/list/${menu.id}`;
            if (menu.active) {
              this.menuName = menu.name;
            }
          }
        });
      });
  }

  disconnect() {
    this.loginService.deleteToken();
    this.router.navigate(['/login']);
  }

  userChange() {
    if(this.isLoginAdmin) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login/admin']);
    }
  }

  goToChild(menu) {
    this.router.navigate(['/list', menu.id]);
  }


  ngOnInit() {
  }

}
