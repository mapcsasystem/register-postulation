import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostulationModel } from 'src/app/shared/models/postulations.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostulationsService {


  private postulationCollection: AngularFirestoreCollection<PostulationModel>;
  postulations: Observable<PostulationModel[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.postulationCollection = afs.collection<PostulationModel>('postulations');
    // this.getPostulations();


    // this.db= firebase.firestore();
    // const settings = { timestampsInSnapshots: true };
    // this.db = afs.firestore.settings(settings);
  }


  getPostulations(): Observable<PostulationModel[]> {
    this.postulationCollection = this.afs.collection<PostulationModel>('postulations');
    this.postulations = this.postulationCollection.valueChanges();
    return this.postulations;
  }



  async createPostulation(postulation: PostulationModel): Promise<void> {
    try {
      const dni = postulation.dni;
      const data = { dni, ...postulation };
      data.createdAt = new Date().toISOString();
      const results = await this.postulationCollection.doc(dni).set(data);

    } catch (error) {
      console.log(error);
    }
  }

  // get timestamp() {
  //   return firebase.firestore.Settings
  // }

}
