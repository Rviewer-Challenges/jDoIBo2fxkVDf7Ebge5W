import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { Website } from '@models/website.model';

import { UserService } from '@services/user.service';
import { WebsiteService } from '@services/website.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  private limit: number = 10;
  private skip: number = 0;

  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      websites: this.getWebsites(),
    }).subscribe({
      next: ({ websites }) => {
        this.websites = websites;
      }
     })
  }

  private getWebsites(): Observable<Website[]> {
    return this.websiteService.getWebsitesSaved(this.skip, this.limit);
  }

  modifySavedWebsites(websiteId: string): void{
    this.userService.modifySavedWebsites(websiteId).subscribe({
      next: () => {
        this.websites.map(website => {
          if(website._id === websiteId) {
            website.inUser = !website.inUser;
          }
        })
      }
    });
  }

}
