import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { ContentsComponent } from './contents.component'
import { ContentsRoutingModule } from './contents-routing.module';

@NgModule({
  imports: [ThemeModule, ContentsRoutingModule],
  declarations: [ContentsComponent],
  entryComponents: [],
  providers: []
})

export class ContentsModule {}