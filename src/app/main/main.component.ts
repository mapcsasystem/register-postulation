import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentUser$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authServices: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.currentUser();
  }

  login(): void {
    this.authServices.login();
    this.currentUser();
  }

  logout(): void {
    this.authServices.logout();
    this.currentUser$ = null;
    this.router.navigate(['']);
  }

  currentUser(): void {
    this.currentUser$ = this.authServices.currentUser()
      .pipe(
        map((user) => user === null ? false : true),
        tap(hasUser => {
          if (!hasUser) {
            this.router.navigate(['/registro']);
          }
        })
      );
  }



}
