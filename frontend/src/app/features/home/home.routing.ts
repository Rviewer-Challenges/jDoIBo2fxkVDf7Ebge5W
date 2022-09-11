import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CategoryComponent } from "./pages/category/category.component";
import { HomeComponent } from "./pages/home/home.component";

const childRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'category/:categoryId',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule {}
