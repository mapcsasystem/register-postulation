import { EducationModel } from './education.model';
import { LanguagesModel } from './languages.model';

export interface Postulation {
    name: string;
    lastName: string;
    dni: string;
    address: string;
    email: string;
    phone: string;
    description: string;
    img: string;
    pais: string;
    education: EducationModel[];
    languages: LanguagesModel[];
}
