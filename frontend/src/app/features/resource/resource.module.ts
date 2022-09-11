import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { ResourceComponent } from './pages/resource/resource.component';

import { ComponentsModule } from './components/components.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ResourceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    NgxStarRatingModule,
    FormsModule
  ]
})
export class ResourceModule { }
