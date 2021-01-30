import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';

import { MainComponent } from './main.component';
import { PostulationComponent } from './pages/postulation/postulation.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    MainComponent,
    PostulationComponent,
    RegisterComponent
  ],
  exports:[
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
  ]
})
export class MainModule { }
