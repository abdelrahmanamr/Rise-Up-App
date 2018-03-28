import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { ContentRoutingModule } from './content-routing.module';

import { ContentComponent } from './content.component'

@NgModule({
  imports: [ThemeModule,ContentRoutingModule],
  declarations: [ContentComponent],
  entryComponents: [],
  providers: []
})

export class ContentModule {}