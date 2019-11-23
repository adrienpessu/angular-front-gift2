import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from './login.service';
import { take } from 'rxjs/operators';
import { ReferentielService } from '../shared/service/referentiel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = '';
  password = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private referentielService: ReferentielService
  ) {
  }

  login() {
    this.loginService.generateToken(this.user, this.password).pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.router.navigate(['/list', this.referentielService.getChilds()[0].id]);
        }
      }, err => {
        console.log('Erreur de login');
        this.loginService.deleteToken();
      }
    );
  }

  changePassword(evt) {
    this.password = evt.target.value;
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.user = params['user'] || 'invite';
      });
  }

}
