import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeaturesComponent } from "./features.component";

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    loadChildren: () => import('./home/home.routing').then(m => m.HomeRoutingModule),
  },
  {
    path: 'resource',
    component: FeaturesComponent,
    loadChildren: () => import('./resource/resource.routing').then(m => m.ResourceRoutingModule),
  },
  {
    path: 'website',
    component: FeaturesComponent,
    loadChildren: () => import('./website/website.routing').then(m => m.WebsiteRoutingModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class FeaturesRoutingModule {}
