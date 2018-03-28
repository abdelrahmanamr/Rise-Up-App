import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewRoutingModule } from './view-routing.module';

import { ViewComponent } from './view.component';

@NgModule({
    imports: [ThemeModule, ViewRoutingModule],
    declarations: [ViewComponent],
    providers: []
})
export class ViewModule {}