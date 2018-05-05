import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewApplicationsComponent } from './viewapplications.component';

const routes: Routes = [
  { path: '', component: ViewApplicationsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewApplicationsRoutingModule { }
