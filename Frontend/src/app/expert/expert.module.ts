import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { ExpertRoutingModule } from './expert-routing.module';
import { ExpertComponent } from './expert.component';

@NgModule({
  imports: [ThemeModule, ExpertRoutingModule],
  declarations: [ExpertComponent],
  entryComponents: [],
  providers: []
})
export class ExpertModule { }
