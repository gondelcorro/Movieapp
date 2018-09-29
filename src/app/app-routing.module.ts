import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PeliculaComponent } from './pages/dashboard/pelicula/pelicula.component';
import { UsuarioComponent } from './pages/dashboard/usuario/usuario.component';

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'dashboard', component:DashboardComponent, children:[
    {path:'pelicula', component:PeliculaComponent},
    {path:'usuario', component:UsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  })
export class AppRoutingModule { }
