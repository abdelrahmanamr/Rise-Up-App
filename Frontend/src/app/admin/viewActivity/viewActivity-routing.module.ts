import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivityComponent } from './viewActivity.component';

const routes: Routes = [
  { path: '', component: ViewActivityComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewReportsRoutingModule {}
