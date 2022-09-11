import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { TourComponent } from './tour/tour.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    TourComponent
  ]
})
export class ComponentsModule { }
