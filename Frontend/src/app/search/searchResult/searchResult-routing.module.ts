import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultComponent } from './searchResult.component';

const routes: Routes = [
    { path: '', component: SearchResultComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchResultRoutingModule {}
