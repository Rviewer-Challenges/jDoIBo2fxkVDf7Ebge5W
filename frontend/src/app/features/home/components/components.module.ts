import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardNavigationComponent } from './card-navigation/card-navigation.component';
import { CardTipsComponent } from './card-tips/card-tips.component';

@NgModule({
  declarations: [
    CardNavigationComponent,
    CardTipsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardNavigationComponent,
    CardTipsComponent
  ]
})
export class ComponentsModule { }
