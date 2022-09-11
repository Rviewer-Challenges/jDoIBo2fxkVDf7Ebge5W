import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { SettingService } from '@services/setting.service';
import { UserService } from '@services/user.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.css']
})
export class ToggleThemeComponent implements OnInit {
  private themeChanged: Subject<boolean> = new Subject();
  constructor(
    private settingService: SettingService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.themeChanged.pipe(debounceTime(800)).subscribe(checked => this.userService.setTheme(checked));
  }

  ngOnInit(): void {
  }

  changeTheme(event: any) {
    const checked = event.checked;
    if(this.authService.isAuthenticated()) {
      this.themeChanged.next(checked);
    }
    this.settingService.setTheme((checked) ? 'dark' : 'light' ); // set local
  }

  get isDarkMode(): boolean {
    return this.settingService.isDarkMode();
  }

}
