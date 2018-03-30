import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'create',
        loadChildren: './create/create.module#CreateModule'
      },
      {
        path: 'postphoto',
        loadChildren: './postphoto/postphoto.module#PostphotoModule'
      },
      {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule {}
