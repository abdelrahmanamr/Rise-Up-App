import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';

const routes: Routes = [
    {
        path: '',
        component: SearchComponent,
        children: [
            {
                path: 'items',
                loadChildren: './searchResult/searchResult.module#SearchResultModule'
            },
            {
                path: '',
                redirectTo: './search/search.module#SearchModule',
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
export class SearchRoutingModule {}
