import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EducationInterface } from 'src/app/shared/interfaces/education.interface';
import { LanguagesInterface } from 'src/app/shared/interfaces/languages.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { RegExpValidation } from 'src/app/shared/regex/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  image: string = null;

  public customPatterns = { 0: { pattern: new RegExp('\[a-zA-Z\]') } };

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
  });

  // image$: Observable<string>;

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
    this.formPersonalData.markAllAsTouched();
    if (this.formPersonalData.invalid) {
      this.formPersonalData.markAsTouched();
      return;
    }
  }

  // tslint:disable-next-line: typedef
  uploadFile(event) {
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

}
