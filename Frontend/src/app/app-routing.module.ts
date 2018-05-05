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
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule'
    },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }

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
