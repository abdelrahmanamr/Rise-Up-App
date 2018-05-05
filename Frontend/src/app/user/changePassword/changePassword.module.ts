import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ChangePasswordRoutingModule } from './changePassword-routing.module';
import { ChangePasswordComponent } from './changePassword.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ThemeModule, ChangePasswordRoutingModule, FormsModule],
    declarations: [ChangePasswordComponent],
    providers: []
})
export class ChangePasswordModule { }