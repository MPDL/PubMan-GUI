import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { AaService } from '../../services/aa.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'pure-aa',
  templateUrl: './aa.component.html',
  styleUrls: ['./aa.component.scss']
})
export class AaComponent implements OnInit {

  // dialog_ref: DialogRef;
  dialog_conf = {
    hasBackdrop: false,
    panelClass: ['pure-dialog', 'p-3', 'mb-2', 'bg-secondary', 'text-white']
  }

  constructor(
    private dialog: Dialog,
    public aa: AaService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sign_in() {
    const ref = this.dialog.open(LoginComponent, this.dialog_conf);
    ref.closed.pipe(
      switchMap((form: any) => form ? this.aa.login(form.username, form.password) : EMPTY),
      catchError(err => {
        console.log(err); // TODO: add error to MessageList
        return EMPTY;
      })
    ).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      }
    );
  }

  sign_out() {
    this.aa.logout();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  profile() {
    this.dialog.open(ProfileComponent, { data: { user: this.aa.user }});
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  settings() {
    const ref = this.dialog.open(SettingsComponent, this.dialog_conf);
    // TODO password change 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

}
