import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ForgotRoutingModule } from './forgot-routing.module';

import { ForgotComponent } from './forgot.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ThemeModule, ForgotRoutingModule, FormsModule],
    declarations: [ForgotComponent],
    providers: []
})
export class ForgotModule { }