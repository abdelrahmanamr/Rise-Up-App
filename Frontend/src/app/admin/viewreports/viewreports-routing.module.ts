import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReportsComponent } from './viewreports.component';

const routes: Routes = [
  { path: '', component: ViewReportsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewReportsRoutingModule {}
