import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';

import { HomeModule } from './home/home.module';
import { ResourceModule } from './resource/resource.module';

import { FeaturesComponent } from './features.component';
import { WebsiteModule } from './website/website.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    HomeModule,
    ResourceModule,
    WebsiteModule,
    AuthModule
  ]
})
export class FeaturesModule { }
