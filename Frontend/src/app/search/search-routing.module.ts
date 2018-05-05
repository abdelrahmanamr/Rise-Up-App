import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [
    {
        path: '',
        component: SearchComponent,
        children: [
            {
                path: 'searchResult',
                loadChildren: './searchResult/searchResult.module#SearchResultModule'
            },
            {
                path: '',
                redirectTo: 'searchResult',
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
export class SearchRoutingModule { }
