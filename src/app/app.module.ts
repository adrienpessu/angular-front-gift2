import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list/list.component';
import { ConfirmDialogComponent } from './list/confirm-dialog/confirm-dialog.component';
import { DetailItemDialogComponent } from './list/detail-item-dialog/detail-item-dialog.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ListGuard } from './list.guard';
import { ListService } from './list/list/list.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'login/:user', component: LoginComponent },
  { path: 'list/:groupId/:memberId', component: ListComponent, canActivate: [ListGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ConfirmDialogComponent,
    DetailItemDialogComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  providers: [ListGuard, ListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [DetailItemDialogComponent, ConfirmDialogComponent]
})
export class AppModule {
}
