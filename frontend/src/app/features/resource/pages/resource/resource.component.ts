import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

import { ResourceService } from '@services/resource.service';
import { UserService } from '@services/user.service';
import { WebsiteService } from '@services/website.service';

import { Website } from '@models/website.model';
import { Resource } from '@models/resource.model';
import { IParams } from '@interfaces/params.interface';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  websites: Website[];
  resource: Resource;
  resources: Resource[];
  private resourceId: string;

  private params: IParams = {
    limit: 10,
    skip: 0,
  }

  isLoading: boolean = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly websiteService: WebsiteService,
    private readonly resourceService: ResourceService,
    private readonly userService: UserService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ resourceId }) => resourceId ? this.loadData(resourceId) : this.router.navigate(['/']));
  }

  loadData(resourceID: string): void {
    this.resourceId = resourceID;
    forkJoin({
      resources: this.resourceService.getResources(7),
      resource: this.resourceService.getResource(resourceID),
      websites: this.getWebsites(resourceID),
    }).subscribe({
      next: ({ resources, resource, websites }) => {
        this.resource = resource;
        this.websites = websites;
        console.log(this.websites);
        this.resources = resources;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  private getWebsites(resourceID: string): Observable<Website[]> {
    return this.websiteService.getWebsitesByResource(resourceID, this.params);
  }

  searchWebsites(search: string) {
    this.params.search = search;
    this.getWebsites(this.resourceId).subscribe({
      next: (websites) => {
        this.websites = websites;
      }
    })
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
