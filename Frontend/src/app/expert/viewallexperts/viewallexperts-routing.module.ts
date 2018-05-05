import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllExpertsComponent } from './viewallexperts.component';

const routes: Routes = [
  { path: '', component: ViewAllExpertsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllExpertsRoutingModule { }