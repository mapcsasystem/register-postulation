import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationInterface } from 'src/app/shared/interfaces/education.interface';
import { LanguagesInterface } from 'src/app/shared/interfaces/languages.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formPersonalData: FormGroup = this.fb.group({
    name: ['Nombre', Validators.required],
    lastName: ['Apellidos', Validators.required],
    dni: ['dni', Validators.required],
    address: ['Direccion', Validators.required],
    email: ['email', Validators.required],
    phone: ['phone', Validators.required],
    description: ['Description', Validators.required],
    img: ['imagen', Validators.required],
  });

  educationDataMain: EducationInterface[] = [];
  validationFormEducation = true;

  languagesDataMain: LanguagesInterface[] = [];
  validationFormLanguages = true;


  addEducation(value: EducationInterface[]): void {
    this.educationDataMain = value;
  }

  onChangesEducationForm(value: boolean): void {
    this.validationFormEducation = value;
  }

  addlanguages(value: LanguagesInterface[]): void {
    this.languagesDataMain = value;
  }

  onChangesLanguagesForm(value: boolean): void {
    this.validationFormLanguages = value;
  }

  constructor(private fb: FormBuilder) { }
}
