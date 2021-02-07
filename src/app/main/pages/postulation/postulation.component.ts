import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
// import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { PostulationModel } from 'src/app/shared/models/postulations.models';
import { Observable } from 'rxjs';
import { PostulationsService } from '../../services/postulation/postulations.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.scss']
})
export class PostulationComponent implements OnInit {

  // @ViewChild('picker') picker;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  displayedColumns: string[] = ['Lugar de educación', 'Nivel logrado', 'Tiempo'];


  items$: Observable<PostulationModel[]>;


  constructor(public postulationService: PostulationsService) { }

  ngOnInit(): void {
    this.items$ = this.postulationService.getPostulations();
  }

}
