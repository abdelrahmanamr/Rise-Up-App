import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpertComponent } from './expert.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertComponent,
    children: [
      {
        path: 'viewallexperts',
        loadChildren: './viewallexperts/viewallexperts.module#ViewAllExpertsModule'
      },
      {
        path: 'viewexpert',
        loadChildren: './viewexpert/viewexpert.module#ViewExpertModule'
      },
<<<<<<< HEAD
=======
     
>>>>>>> ReadingContent
      {
        path: '',
        redirectTo: 'viewallexperts'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ExpertRoutingModule {}
