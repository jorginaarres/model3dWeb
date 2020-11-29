import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EngineComponent } from './model/engine/engine.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { ModelComponent } from './model/model.component';
import {UiComponent} from './model/ui/ui.component';
import {FlexModule} from '@angular/flex-layout';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS} from '@angular/material/progress-spinner';

const config: SocketIoConfig = { url: 'http://hackeps.salmeronmoya.com:80', options: {transports: ['websocket']} };


@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    LoginComponent,
    ModelComponent,
    UiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SocketIoModule.forRoot(config),
    MatCardModule,
    MatButtonModule,
    FlexModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
