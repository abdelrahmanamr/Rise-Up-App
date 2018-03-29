import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ThemeModule, LoginRoutingModule,FormsModule],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}