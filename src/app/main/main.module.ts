import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../shared/pipes/pipes.module';

import { MainComponent } from './main.component';
import { FormEducationComponent } from './components/form-education/form-education.component';
import { FormLanguagesComponent } from './components/form-languages/form-languages.component';
import { PostulationComponent } from './pages/postulation/postulation.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgxMaskModule } from 'ngx-mask';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { DatesPipe } from './pipes/dates/dates.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    MainComponent,
    PostulationComponent,
    RegisterComponent,
    FormEducationComponent,
    FormLanguagesComponent,
    FilterPipe,
    DatesPipe,
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    NgxMaskModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }
  ]
})
export class MainModule { }
