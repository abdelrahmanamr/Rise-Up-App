import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsInputModule } from 'ngx-tags-input/dist';
@NgModule({
  imports: [ThemeModule, RegisterRoutingModule, FormsModule, ReactiveFormsModule, TagsInputModule.forRoot()],
  declarations: [RegisterComponent],
  providers: []
})
export class RegisterModule { }
