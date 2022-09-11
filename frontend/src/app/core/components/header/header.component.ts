import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '@models/user.model';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userActive: User;
  private userActiveSubscription: Subscription;

  @ViewChild('menuSidenav') menuSidenav: ElementRef;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.userActiveSubscription = this.authService.isAuthenticatedEmitter.subscribe(({isAuth}) => {
      if(isAuth) {
        this.setUserInfoActive();
        this.isAuthenticated = true;
        this.menuSidenav.nativeElement.classList.remove('open');
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  loadData(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated) {
      this.setUserInfoActive();
    }
  }

  ngOnDestroy(): void {
    this.userActiveSubscription.unsubscribe();
  }

  showSidenav(): void {
    this.menuSidenav.nativeElement.classList.toggle('open');
  }

  setUserInfoActive(): void {
    this.userActive = this.authService.getUserActive;
  }

  get getImage(): string {
    return this.userActive.image;
  }

  get getName(): string {
    const { name, lastName, email } = this.userActive;
    return (name && name?.length > 0) ? `${name} ${lastName || ''}` : email;
  }

  showModal(to: 'login'|'register'): void {
    this.authService.showModalAuth(to);
  }

  logOut(): void {
    this.authService.logout();
  }

}
