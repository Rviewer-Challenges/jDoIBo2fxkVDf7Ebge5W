import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IsAuthGuard } from "@guards/is-auth.guard";

import { SavedComponent } from "./pages/saved/saved.component";
import { WebsiteComponent } from "./pages/website/website.component";

const childRoutes: Routes = [
  {
    path: 'saved',
    canActivate: [IsAuthGuard],
    component: SavedComponent
  },
  {
    path: ':websiteId',
    component: WebsiteComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class WebsiteRoutingModule {}