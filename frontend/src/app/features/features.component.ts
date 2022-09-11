import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

import { User } from '@models/user.model';

import { AuthService } from '@services/auth.service';
import { SettingService } from '@services/setting.service';
import { UserService } from '@services/user.service';
import Storage from '@utils/storage.util';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private settingService: SettingService) {
      authService.validateToken().subscribe(() => {
        const userActive: User = authService.getUserActive;
        if(userActive) {
          settingService.setTheme(userActive.darkMode ? 'dark' : 'light');
        } else {
        }
        this.isLoading = false;
      });
  }
  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
    if(this.authService.isAuthenticated()) {
      this.userService.showTour(this.authService.getUserActive.tour);
    } else {
      let result = JSON.parse(Storage.getItem('tour', true));
      if(result === null) {
        result = true;
      }
      this.userService.showTour(result);
    }
  }

  ngOnInit(): void {
  }

}
