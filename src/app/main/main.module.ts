import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';

import { PostulationComponent } from './pages/postulation/postulation.component';
import { RegisterComponent } from './pages/register/register.component';
import { TableComponent } from './components/table/table.component';



import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './components/form/form.component';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent,
    PostulationComponent,
    RegisterComponent,
    TableComponent,
    FormComponent
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
