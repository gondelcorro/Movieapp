import { Subject } from 'rxjs';
import { Rating } from './../_model/rating';
import { HOST } from './../_shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  url:string = `${HOST}/dashboard/rating`;
  mensaje = new Subject<string>();

  constructor(private http:HttpClient) { }

  getListar(){
    return this.http.get<Rating[]>(`${this.url}/listar`);
  }

  registrar(rating:Rating){    
    return this.http.post(`${this.url}/registrar`, rating )
  }

  modificar(rating:Rating){
    return this.http.put(`${this.url}/actualizar`, rating);
  }

  eliminar(rating:Rating){
    return this.http.delete(`${this.url}/eliminar/${rating.idRating}`);
  }

  getRatingPorId(id:number){
    return this.http.get<Rating>(`${this.url}/listar/${id}`);
  }

}
