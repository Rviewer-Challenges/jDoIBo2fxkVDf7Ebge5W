import { Component } from '@angular/core';

import { SettingService } from '@services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(
    private settingService: SettingService,
  ) {
    const theme = localStorage.getItem('theme');
    if(!theme) {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.settingService.setTheme((isDarkMode) ? 'dark' : 'light');
    } else {
      this.settingService.setTheme(theme as 'dark'|'light');
    }
  }
}
