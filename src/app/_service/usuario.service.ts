import { HOST } from './../_shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string = `${HOST}/dashboard/usuario`;

  constructor(private http:HttpClient) { }

  getListar(){
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }

  registrar(usuario:Usuario){    
    return this.http.post(`${this.url}/registrar`, usuario )
  }

  modificar(usuario:Usuario){
    return this.http.put(`${this.url}/actualizar`, usuario);
  }

  eliminar(usuario:Usuario){
    return this.http.delete(`${this.url}/eliminar/${usuario.idUser}`);
  }

  getUsuarioPorId(id:number){
    return this.http.get<Usuario>(`${this.url}/listar/${id}`);
  }

}
