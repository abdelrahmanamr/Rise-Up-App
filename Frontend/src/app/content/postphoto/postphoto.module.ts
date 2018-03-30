import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { PostphotoRoutingModule } from './postphoto-routing.module';

import { PostphotoComponent } from './postphoto.component';

@NgModule({
  imports: [ThemeModule, PostphotoRoutingModule],
  declarations: [PostphotoComponent],
  providers: []
})
export class PostphotoModule {}
