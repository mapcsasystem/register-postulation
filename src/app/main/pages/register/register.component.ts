import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { RegExpValidation } from 'src/app/shared/regex/regex';
import { EducationModel } from 'src/app/shared/models/education.model';
import { LanguagesModel } from 'src/app/shared/models/languages.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  image: string = null;

  uploadPercent$: Observable<number>;
  downloadURL$: Observable<string>;

  formPersonalData: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(RegExpValidation.email)]],
    phone: ['', [Validators.required, Validators.minLength(12)]],
    description: ['', Validators.required],
    img: ['', [Validators.required]],
    pais: [''],
    education: this.fb.array([]),
    languages: this.fb.array([])
  });


  educationDataMain: EducationModel[] = [];
  validationFormEducation = true;

  languagesDataMain: LanguagesModel[] = [];
  validationFormLanguages = true;


  addEducation(value: EducationModel[]): void {
    this.educationDataMain = value;
  }

  onChangesEducationForm(value: boolean): void {
    this.validationFormEducation = value;
  }

  addlanguages(value: LanguagesModel[]): void {
    this.languagesDataMain = value;
  }

  onChangesLanguagesForm(value: boolean): void {
    this.validationFormLanguages = value;
  }


  saveData(): void {
    this.formPersonalData.markAllAsTouched();
    if (this.formPersonalData.invalid) {
      this.formPersonalData.markAsTouched();
      return;
    }

    const getStringForArray = this._removeValueLastWords(this.formPersonalData.get('address').value);
    this.formPersonalData.get('country').setValue(getStringForArray);
    this.formPersonalData.get('education').setValue(this.educationDataMain);
    this.formPersonalData.get('languages').setValue(this.languagesDataMain);


  }

  uploadFile(event): void {
    if (this.image === null) {
      this.image = new Date().toISOString();
    }
    const file = event.target.files[0];
    const name = `images/${this.image}.png`;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);
    this.uploadPercent$ = task.percentageChanges();
    const image1 = task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL$ = fileRef.getDownloadURL();
        this.downloadURL$.subscribe(url => {
          this.formPersonalData.get('img').setValue(url);
        });
      })
    )
      .subscribe();
  }

  constructor(private fb: FormBuilder, private storage: AngularFireStorage) { }


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

  private _removeValueLastWords(value: string): string {
    let arr: string[] = value.split(' ');
    arr = arr.filter(e => e !== '');
    return arr[arr.length - 1];
  }

}
