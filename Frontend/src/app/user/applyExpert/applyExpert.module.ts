import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ApplyExpertRoutingModule } from './applyExpert-routing.module';

import { ApplyExpertComponent } from './applyExpert.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ThemeModule, ApplyExpertRoutingModule, FormsModule],
    declarations: [ApplyExpertComponent],
    providers: []
})
export class ApplyExpertModule { }