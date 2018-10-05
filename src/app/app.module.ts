import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PeliculaComponent } from './pages/dashboard/pelicula/pelicula.component';
import { UsuarioComponent } from './pages/dashboard/usuario/usuario.component';
import { MaterialModule } from './material/material.module';
import { StarRatingModule } from 'angular-star-rating'; //IMPORTO el angular-star-rating
import { FormsModule } from '@angular/forms'; //NECESARIO PARA EL ngModel
import { RatingComponent } from './pages/dashboard/rating/rating.component';

//ESTO AGREGAR SOLO AL MOMENTO DE DESPLEGAR, SINO COMENTAR
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    PeliculaComponent,
    UsuarioComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    StarRatingModule.forRoot(), //Se importa asi el angular-star-rating
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
