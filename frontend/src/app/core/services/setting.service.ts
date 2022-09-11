import { Injectable } from '@angular/core';

import Storage from '@utils/storage.util';


@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private bodyElement = document.body as HTMLBodyElement;
  constructor() { }

  setTheme(theme: 'dark' | 'light'): void {
    if(theme === 'light') {
      this.bodyElement.classList.remove('dark');
    }
    if(theme === 'dark') {
      this.bodyElement.classList.add('dark');
    }
    this.savePreference(theme);
  }

  private savePreference(theme: 'dark'| 'light') {
    Storage.deleteLocalStorage('theme');
    Storage.saveLocalStorage('theme', theme);

  }

  isDarkMode(): boolean {
    return this.bodyElement.classList.contains('dark');
  }

}
