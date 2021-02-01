import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';

import { MainComponent } from './main.component';
import { FormEducationComponent } from './components/form-education/form-education.component';
import { FormLanguagesComponent } from './components/form-languages/form-languages.component';
import { PostulationComponent } from './pages/postulation/postulation.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    MainComponent,
    PostulationComponent,
    RegisterComponent,
    FormEducationComponent,
    FormLanguagesComponent,
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
