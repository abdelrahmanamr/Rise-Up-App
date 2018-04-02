import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },  {
          path: 'register',
          loadChildren: './register/register.module#RegisterModule'
        }, {
            path: 'forgot',
            loadChildren: './forgot/forgot.module#ForgotModule'
        },  {
            path: 'reset',
            loadChildren: './reset/reset.module#ResetModule'
        },
        {
        path: '',
        redirectTo: 'login',
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
export class UserRoutingModule {

}
