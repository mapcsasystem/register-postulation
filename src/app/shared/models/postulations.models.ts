import { EducationModel } from './education.model';
import { LanguagesModel } from './languages.model';

export interface PostulationModel {
    address: string;
    country: string;
    createdAt: string;
    description: string;
    dni: string;
    educations: EducationModel[];
    email: string;
    img: string;
    name: string;
    languages: LanguagesModel[];
    lastName: string;
    phone: string;
}
