import { EducationModel } from './education.model';
import { LanguagesModel } from './languages.model';

export interface PostulationModel {
    name: string;
    lastName: string;
    dni: string;
    address: string;
    email: string;
    phone: string;
    description: string;
    img: string;
    pais: string;
    educations: EducationModel[];
    languages: LanguagesModel[];
    createdAt: string;
}
