import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ResetRoutingModule } from './reset-routing.module';

import { ResetComponent } from './reset.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ThemeModule, ResetRoutingModule,FormsModule],
    declarations: [ResetComponent],
    providers: []
})
export class ResetModule {}