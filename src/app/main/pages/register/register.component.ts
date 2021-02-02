import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EducationInterface } from 'src/app/shared/interfaces/education.interface';
import { LanguagesInterface } from 'src/app/shared/interfaces/languages.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  imgFlag: any;

  formPersonalData: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    dni: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    description: ['', Validators.required],
    img: ['', Validators.required],
  });

  image$: Observable<any>;

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


  saveData(): void {
    if (this.formPersonalData.invalid) {
      this.formPersonalData.markAsTouched();
      return;
    }
  }

  uploadFile(event): void {
    // const file = event.target.files[0];
    // const name = `${this.formPersonalData.controls.dni.value}`;
    // const fileRef = this.storage.ref(name);
    // // const dir = 'images';

    // const task = this.storage.upload(dir, file);
    // task.snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.image$ = fileRef.getDownloadURL();
    //     })
    //   )
    //   .subscribe();

    // console.log(filePath)
    // const ref = this.storage.ref(filePath);
    // const task = ref.putString(file);


  }

  constructor(private fb: FormBuilder) { }


  get name(): AbstractControl {
    return this.formPersonalData.get('name');
  }
  get lastName(): AbstractControl {
    return this.formPersonalData.get('lastName');
  }
  get dni(): AbstractControl {
    return this.formPersonalData.get('dni');
  }

  get address(): AbstractControl {
    return this.formPersonalData.get('address');
  }
  get email(): AbstractControl {
    return this.formPersonalData.get('email');
  }

  get phone(): AbstractControl {
    return this.formPersonalData.get('phone');
  }
  get description(): AbstractControl {
    return this.formPersonalData.get('description');
  }

  get img(): AbstractControl {
    return this.formPersonalData.get('img');
  }

}
