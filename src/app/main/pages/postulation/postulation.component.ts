import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostulationModel } from 'src/app/shared/models/postulations.models';
import { Subscription } from 'rxjs';
import { PostulationsService } from '../../services/postulation/postulations.service';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.scss']
})
export class PostulationComponent implements OnInit, OnDestroy {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dateEnd = new Date();
  range = new FormGroup({
    start: new FormControl({ value: null, disabled: true }),
    end: new FormControl({ value: null, disabled: true })
  });
  dateActual: Date;
  end: Date;
  searchFilter = '';
  displayedColumns: string[] = ['Lugar de educación', 'Nivel logrado', 'Tiempo'];

  subscriptions: Subscription = new Subscription();
  items$: PostulationModel[] = [];

  constructor(public postulationService: PostulationsService) { }

  ngOnInit(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.postulationService.getPostulations().subscribe(item => {
        this.items$ = item;
      })
    );
    // this.onChanges();
  }

  searchDate(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
