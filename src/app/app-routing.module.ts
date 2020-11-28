import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EngineComponent} from './engine/engine.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: EngineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
