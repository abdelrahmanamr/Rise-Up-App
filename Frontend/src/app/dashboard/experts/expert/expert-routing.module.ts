import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpertComponent } from './expert.component';

const routes: Routes = [
  { path: '', component: ExpertComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertRoutingModule {}