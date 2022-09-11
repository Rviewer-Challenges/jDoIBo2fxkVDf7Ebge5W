import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { IModalAuth } from '@interfaces/modal.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  @ViewChild('modalAuth') modalAuth: ElementRef;
  private bodyElement = document.body as HTMLBodyElement;

  public showLogin: boolean = false;
  public showMore: boolean = true;
  private modalOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticatedEmitter.subscribe(({ to, isAuth }) => !isAuth && to !== 'hide' ? this.openModal({to, isAuth}) : '');
  }

  openModal(options: IModalAuth): void {
    const { to } = options;
    if(to !== 'init') {
      this.showMore = false;
      this.showLogin = to === 'login' ? true : false;
    } else {
      this.showMore = true;
      this.showLogin = false;
    }
    this.bodyElement.classList.add('modal-open');
    this.modalAuth.nativeElement.classList.add('modal-open');
    this.modalOpen = true;
  }

  closeModal(): void {
    this.bodyElement.classList.remove('modal-open');
    this.modalAuth.nativeElement.classList.remove('modal-open');
    this.modalOpen = false;
    this.showLogin = false;
    this.showMore = true;
  }

  changePage(show: boolean) {
    this.showMore = false;
    this.showLogin = show;
  }

  @HostListener('window:keyup.esc', ['$event'])
  onKeyup(event: any) {
    if(this.modalOpen) {
        this.closeModal();
      }
    }

}
