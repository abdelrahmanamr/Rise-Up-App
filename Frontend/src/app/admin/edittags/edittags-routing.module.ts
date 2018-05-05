import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdittagsComponent } from './edittags.component';

const routes: Routes = [
  { path: '', component: EdittagsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdittagsRoutingModule { }