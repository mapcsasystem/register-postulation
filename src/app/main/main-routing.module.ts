import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

import { MainComponent } from './main.component';
import { PostulationComponent } from './pages/postulation/postulation.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'registro',
        component: RegisterComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'postulantes',
        canActivate: [AdminGuard],
        component: PostulationComponent
      },
      { path: '**', redirectTo: 'register' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
