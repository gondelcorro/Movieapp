import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pelicula } from './../../../_model/pelicula';
import { PeliculaService } from './../../../_service/pelicula.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  listaPeliculas: Pelicula[] = [];
  pelicula: Pelicula;
  nombre: string;
  fecha: Date; 
  director: string;
  genero: string;
  calificacion: number;
  mensaje: string;

  selectedFiles: FileList;//LISTA DE ARCHIVOS PARA SUBIR
  currentFileUpload: File;
  labelFile: string;
  archivoSrc: string = '';
  imagenData: any; //la img es de cualq tipo xq viene un stream de datos


  constructor(private peliculaService: PeliculaService, private sanitization: DomSanitizer, private snackBar: MatSnackBar) {}

  ngOnInit() {

    this.peliculaService.getListar().subscribe(data => {
      this.listaPeliculas = data;
    });
  }

  agregar() {
    this.pelicula = new Pelicula();
    this.pelicula.nombre = this.nombre;
    this.pelicula.fecha = this.fecha;
    this.pelicula.director = this.director;
    this.pelicula.genero = this.genero;
    this.pelicula.calificacion = this.calificacion;
    this.peliculaService.registrar(this.pelicula).subscribe(peli => {
      if (peli !== null) {
        this.pelicula = peli;
        this.guardarArchivo(peli.idPelicula);
        //CUANDO INSERTO VUELVO A LLAMAR AL LISTADO DE PELICULAS DEL SERVICE
        this.peliculaService.getListar().subscribe(peliculas => {
          this.listaPeliculas = peliculas;
          //MUESTRO EL MSJS
          this.snackBar.open("Se registro correctamente", "Aviso", { duration: 2000 });
        });
      } else {
        this.snackBar.open("No se registro", "Aviso", { duration: 2000 });
      }
    });
    this.limpiarControles();
  }

  eliminar(pelicula: Pelicula): void {
    this.peliculaService.eliminar(pelicula).subscribe(data => {
      if (data === 1) {
        this.peliculaService.getListar().subscribe(peliculas => {
          this.listaPeliculas = peliculas;
          this.snackBar.open("Se elimino correctamente", "Aviso", { duration: 3000 });
        });
      } else {
        this.snackBar.open("No se elimino", "Aviso", { duration: 3000 });
      }
    });
  }

  limpiarControles() {
    this.nombre = '';
    this.director = '';
    this.genero = '';
    this.calificacion = 0;
    this.fecha = new Date();
    this.fecha.setFullYear(0);
    this.fecha.setMonth(0);
    this.fecha.setDate(0);
    this.mensaje = '';
    this.labelFile= '';
  }

  selectFile(event) {
    console.log(event.target.files);//toma el archivo seleccionado a partir del evento
    this.labelFile = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

  guardarArchivo(idPelicula: number) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.peliculaService.guardarArchivo(this.currentFileUpload, idPelicula).subscribe(data => {
      //console.log(data);
    })
    //this.selectedFiles = undefined; //limpia la seleccion de archivo
  }

  mostrarImagen(pelicula: Pelicula) {
    this.peliculaService.leerArchivo(pelicula.idPelicula).subscribe(data => {
      this.imagenData = data;
      let x = this.convertir(data);
      this.nombre = pelicula.nombre;
    });
  }

  //transforma la data en un archivo de lectura de js
  convertir(data: any) {
    var reader = new FileReader(); //transforma al arcvhio con FileReader
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let x = reader.result;
      this.setear(x);
    }
  }
  //proteje la url para que puede ser accesible y leida por angular
  setear(x: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
    //una vez q la img es segura, le cambia el estado y la pinta xq el html tiene el flag ngIf
    //this.imagenEstado = true;
  }

}
