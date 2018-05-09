import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';

@NgModule({
    imports: [ThemeModule, AdminRoutingModule],
    declarations: [AdminComponent],
    entryComponents: [],
    providers: []
})
export class AdminModule { }