import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUsersComponent } from './viewusers.component';

const routes: Routes = [
  { path: '', component: ViewUsersComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewUsersRoutingModule {}
