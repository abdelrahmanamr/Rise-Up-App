import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllContentsComponent } from './viewallcontents.component';

const routes: Routes = [
  { path: '', component: ViewAllContentsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllContentsRoutingModule {}
