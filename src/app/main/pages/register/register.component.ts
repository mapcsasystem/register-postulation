import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { RegExpValidation } from 'src/app/shared/regex/regex';
import { EducationModel } from 'src/app/shared/models/education.model';
import { LanguagesModel } from 'src/app/shared/models/languages.model';
import { PostulationsService } from '../../services/postulation/postulations.service';

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
    educations: '',
    languages: '',
    createdAt: [''],
    country: [''],
  });


  educationDataMain: EducationModel[] = [];
  validationFormEducation = true;

  languagesDataMain: LanguagesModel[] = [];
  validationFormLanguages = true;


  addEducationChange(value: EducationModel[]): void {
    this.educationDataMain = value;
  }

  addlanguagesChange(value: LanguagesModel[]): void {
    this.languagesDataMain = value;
  }

  onChangesEducationForm(value: boolean): void {
    this.validationFormEducation = value;
  }


  onChangesLanguagesForm(value: boolean): void {
    this.validationFormLanguages = value;
  }


  async saveData(): Promise<void> {
    this.formPersonalData.markAllAsTouched();
    if (this.formPersonalData.invalid) {
      this.formPersonalData.markAsTouched();
      return;
    }

    try {
      const objeto1 = {
        educations: []
      };
      const objeto2 = {
        languages: []
      };
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.educationDataMain.length; i++) {
        objeto1.educations.push(this.educationDataMain[i]);
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.languagesDataMain.length; i++) {
        objeto2.languages.push(this.languagesDataMain[i]);
      }
      const getStringForArray: string = this._removeValueLastWords(this.formPersonalData.get('address').value);
      this.formPersonalData.controls.country.setValue(getStringForArray);
      this.formPersonalData.reset();
      this.educationDataMain = [];
      this.languagesDataMain = [];
      const object3 = this.formPersonalData.value;
      object3.educations = objeto1.educations;
      object3.languages = objeto2.languages;
      await this.postulationsService.createPostulation(object3);
      alert('Datos guardados correctamente');
    } catch (error) {
      console.log(error);
    }
    this.formPersonalData.reset();
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

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private postulationsService: PostulationsService
  ) {
  }


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

  private setValueArray(value: any, arr: EducationModel[] | LanguagesModel[]): any {
    const obj = { ...value };
    const arrAux = [...arr];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arrAux.length; i++) {
      obj.educations.push(arrAux[i]);
    }
    return obj;
  }
}
