import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

import Storage from '@utils/storage.util';

import { IResponseWebsite } from '@interfaces/response.interface';

import { AuthService } from './auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private bodyElement = document.body as HTMLBodyElement;
  @ViewChild('modalTour') modalTour: ElementRef;

  showModalEmitter: EventEmitter<boolean> = new EventEmitter();

  get headers() {
    return {
      headers: {
        'x-token': Storage.getItem('x-token'),
      },
    };
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  showTour(show: boolean): void {
    if(!show)  {
      this.bodyElement.classList.remove('modal-open');
    } else {
      this.bodyElement.classList.add('modal-open')
    }
    this.showModalEmitter.emit(show);

  }

  changeTourVisibilityLocal (): void {
    Storage.saveLocalStorage('tour', false);
    if(this.authService.isAuthenticated()) {
      this.changeTourVisibility();
    }
    this.showModalEmitter.emit(false);
    this.bodyElement.classList.remove('modal-open');
  }

  private changeTourVisibility(): void {
    const url = `${base_url}/user/tour`;
    this.http.patch(url, {}, this.headers).subscribe();
  }

  setTheme(darkMode: boolean): void {
    const url = `${base_url}/user/theme`;
    this.http.patch(url, { darkMode }, this.headers).subscribe();
  }

  modifySavedWebsites(websiteId: string): Observable<Boolean> {
    const url = `${base_url}/user/saved/${websiteId}`;
    return this.http.patch<IResponseWebsite>(url, {}, this.headers).pipe(map(resp => resp.ok));
  }

}
