import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ComponentsModule } from './components/components.module';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class HomeModule { }
