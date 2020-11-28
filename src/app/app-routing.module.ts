import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ModelComponent} from './model/model.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: ModelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
