import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';

import { PostulationComponent } from './pages/postulation/postulation.component';
import { RegisterComponent } from './pages/register/register.component';


import { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { FormEducationComponent } from './components/form-education/form-education.component';
import { FormLanguagesComponent } from './components/form-languages/form-languages.component';


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
