import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewSuggestedContentRoutingModule } from './viewsuggestedcontent-routing.module';

import { ViewSuggestedContentComponent } from './viewsuggestedcontent.component';

@NgModule({
  imports: [ThemeModule,ViewSuggestedContentRoutingModule],
  declarations: [ViewSuggestedContentComponent],
  providers: []
})
export class ViewSuggestedContentModule {}
