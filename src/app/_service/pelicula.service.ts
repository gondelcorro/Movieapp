import { HOST } from './../_shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pelicula } from '../_model/pelicula';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  url: string = `${HOST}/dashboard/pelicula`;
  //PARA PROG REACTIVA DE TIPO SUBJECT SUBTIPO LISTA DE PACIENTES (LA LISTA DE PELIS SE ACTUALIZA ACUTOMATICAMENT)
  peliCambio = new Subject<Pelicula[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  getListarPelicula(p: number, s: number) {
    return this.http.get<Pelicula[]>(`${this.url}/listarPageable?page=${p}&size=${s}`);
  }

  getListar() {
    return this.http.get<Pelicula[]>(`${this.url}/listar`);
  }

  //EL SERVICE REST EN EL BACK LE DEVUELVE UNA PELICULA PARA TOMAR EL ID Y GUARDAR LA IMG
  registrar(pelicula: Pelicula) {
    return this.http.post<Pelicula>(`${this.url}/registrar`, pelicula);
  }

  modificar(pelicula: Pelicula) {
    return this.http.put(`${this.url}/actualizar`, pelicula);
  }

  eliminar(pelicula: Pelicula) {
    return this.http.delete(`${this.url}/eliminar/${pelicula.idPelicula}`);
  }

  getPeliculaPorId(id: number) {
    return this.http.get<Pelicula>(`${this.url}/listar/${id}`);
  }

  //MANDO EL ID DE PELI X URL Y LA IMG POR E BODY
  guardarArchivo(data: File, idPelicula: number) {
    let formdata: FormData = new FormData();
    formdata.append('file', data);//file contiene el archivo con la data
    return this.http.post(`${this.url}/guardarArchivo/${idPelicula}`, formdata, {
      responseType: 'text'//el backend devuelve un texto
    });
  }

  leerArchivo(idPelicula:number) {
    return this.http.get(`${this.url}/leerArchivo/${idPelicula}`, {
      responseType: 'blob' //es blob xq recibe una secuencia de bytes
    });
  }
}
