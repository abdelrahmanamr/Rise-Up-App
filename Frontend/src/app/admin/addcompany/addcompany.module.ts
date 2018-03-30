import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AddcompanyRoutingModule } from './addcompany-routing.module';

import { AddcompanyComponent } from './addcompany.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [ThemeModule, AddcompanyRoutingModule,FormsModule,ReactiveFormsModule],
  declarations: [AddcompanyComponent],
  providers: []
})

export class AddCompanyModule {}