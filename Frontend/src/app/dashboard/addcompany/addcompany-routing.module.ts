import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcompanyComponent } from './addcompany.component';

const routes: Routes = [
  { path: '', component: AddcompanyComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcompanyRoutingModule {}
