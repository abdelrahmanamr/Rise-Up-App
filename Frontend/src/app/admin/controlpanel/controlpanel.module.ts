import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ControlPanelRoutingModule } from './controlpanel-routing.module';

import { ControlPanelComponent } from './controlpanel.component';

@NgModule({
  imports: [ThemeModule, ControlPanelRoutingModule],
  declarations: [ControlPanelComponent],
  providers: []
})
export class ControlPanelModule {}
