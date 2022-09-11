import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardResourcesComponent } from './card-resources/card-resources.component';

@NgModule({
  declarations: [
    CardResourcesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardResourcesComponent,
  ]
})
export class ComponentsModule { }
