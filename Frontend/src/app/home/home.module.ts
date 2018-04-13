import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [ThemeModule, HomeRoutingModule],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: []
})
export class HomeModule {}
