import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CategoryService } from '@services/category.service';
import { ResourceService } from '@services/resource.service';
import { WebsiteService } from '@services/website.service';

import { Resource } from '@models/resource.model';
import { Category } from '@models/category.model';
import { Website } from '@models/website.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private limit: number = 10;
  private skip: number = 0;
  resources: Resource[];
  category: Category;
  websites: Website[];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly resourceService: ResourceService,
    private readonly websiteService: WebsiteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ categoryId }) => categoryId ? this.loadData(categoryId) : this.router.navigate(['/']));
  }

  loadData(categoryID: string): void {
    forkJoin({
      resources: this.resourceService.getResources(this.limit, this.skip, categoryID),
      category: this.categoryService.getCategory(categoryID),
      websites: this.websiteService.getWebsites(10),
    }).subscribe({
      next: ({ resources, category, websites }) => {
        this.resources = resources;
        this.category = category;
        this.websites = websites;
      }
    })
  }

}
