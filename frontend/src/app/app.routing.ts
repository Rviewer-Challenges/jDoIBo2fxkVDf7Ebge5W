import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FeaturesRoutingModule } from "./features/features.routing";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
    FeaturesRoutingModule
  ],
})
export class AppRoutingModule {}
