import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { ComponentsModule } from './components/components.module';

import { SavedComponent } from './pages/saved/saved.component';
import { WebsiteComponent } from './pages/website/website.component';

@NgModule({
  declarations: [
    WebsiteComponent,
    SavedComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    SharedModule,
    NgxStarRatingModule,
    FormsModule,
  ]
})
export class WebsiteModule { }
