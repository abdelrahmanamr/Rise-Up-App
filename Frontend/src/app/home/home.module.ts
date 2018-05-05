//Salma Osama
import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderModule, Slider } from 'ngx-slider';

@NgModule({
  imports: [ThemeModule, HomeRoutingModule, SliderModule],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: []
})
export class HomeModule { }
