import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
 
  {

    path: 'content',
    loadChildren: './content/content.module#ContentModule'
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: 'expert',
    loadChildren: './expert/expert.module#ExpertModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
        path: 'reset/:id',
        loadChildren: './user/reset/reset.module#ResetModule'
    },
    // {
    //   path: 'viewcontent/:id',
    //   loadChildren: './content/viewcontent/viewcontent.module#ViewContentModule'
    // },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search' }

];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
