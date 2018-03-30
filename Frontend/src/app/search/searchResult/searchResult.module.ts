import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchResultRoutingModule } from './searchResult-routing.module';

import { SearchResultComponent } from './searchResult.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [ThemeModule, SearchResultRoutingModule,FormsModule ],
    declarations: [SearchResultComponent],
    providers: []
})
export class SearchResultModule {}
