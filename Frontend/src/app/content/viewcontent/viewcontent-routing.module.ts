import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewContentComponent } from './viewcontent.component';

const routes: Routes = [
  { path: '', component: ViewContentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewContentRoutingModule {}
