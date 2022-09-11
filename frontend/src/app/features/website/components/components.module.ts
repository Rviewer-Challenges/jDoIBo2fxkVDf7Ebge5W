import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';


@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    NgxStarRatingModule,
    FormsModule
  ],
  exports: [
    CommentComponent,
    CommentFormComponent
  ]
})
export class ComponentsModule { }
