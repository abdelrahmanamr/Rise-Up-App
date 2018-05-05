import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule } from "@angular/forms"
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [ThemeModule, SearchRoutingModule, FormsModule],
    declarations: [SearchComponent],
    entryComponents: [],
    providers: []
})
export class SearchModule { }