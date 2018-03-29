import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';

@NgModule({
    imports: [ThemeModule, SearchRoutingModule],
    declarations: [SearchComponent],
    entryComponents: [],
    providers: []
})
export class SearchModule {}