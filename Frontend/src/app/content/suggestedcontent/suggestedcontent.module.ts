import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SuggestedContentRoutingModule } from './suggestedcontent-routing.module';
import { SuggestedContentComponent } from './suggestedcontent.component';

@NgModule({
  imports: [ThemeModule, SuggestedContentRoutingModule],
  declarations: [SuggestedContentComponent],
  providers: []
})
export class SuggestedContentModule { }
