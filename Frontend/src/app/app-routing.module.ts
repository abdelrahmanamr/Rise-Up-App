import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'content',
    loadChildren: './content/content.module#ContentModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: '', redirectTo: 'content', pathMatch: 'full' },
  { path: '**', redirectTo: 'content' }

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
