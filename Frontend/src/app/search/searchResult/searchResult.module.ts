import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchResultRoutingModule } from './searchResult-routing.module';

import { SearchResultComponent } from './searchResult.component';

@NgModule({
    imports: [ThemeModule, SearchResultRoutingModule ],
    declarations: [SearchResultComponent],
    providers: []
})
export class SearchResultModule {}
