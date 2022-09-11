import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ResourceComponent } from "./pages/resource/resource.component";

const childRoutes: Routes = [
  {
    path: ':resourceId',
    component: ResourceComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ResourceRoutingModule {}