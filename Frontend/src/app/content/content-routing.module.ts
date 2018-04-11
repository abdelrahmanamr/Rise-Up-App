import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'viewallcontents',
        loadChildren: './viewallcontents/viewallcontents.module#ViewAllContentsModule'
      },
      {
        path: 'viewcontent',
        loadChildren: './viewcontent/viewcontent.module#ViewContentModule'
      },
      {
        path: 'editcontent',
        loadChildren: './editcontent/editcontent.module#EditcontentModule'
      },
      {
        path: 'create',
        loadChildren: './create/create.module#CreateModule'
      },
      {
        path: '',
        redirectTo: 'viewallcontents'
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
