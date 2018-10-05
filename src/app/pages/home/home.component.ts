import { PeliculaConImg } from './../../_model/peliculaConImg';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeliculaService } from './../../_service/pelicula.service';
import { Pelicula } from './../../_model/pelicula';
import { Component, OnInit } from '@angular/core';
import { ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaPeliculas: Pelicula[] = [];
  puntuacion: number = 0;
  onClickResult: ClickEvent;
  mensaje: string;

  selectedFiles: FileList;//LISTA DE ARCHIVOS PARA SUBIR
  currentFileUpload: File;
  labelFile: string;
  archivoSrc: string = '';
  imagenData: any; //la img es de cualq tipo xq viene un stream de datos

  listPelisConImg: PeliculaConImg[] = [];

  constructor(private peliculaService: PeliculaService, private snackBar: MatSnackBar, private sanitization: DomSanitizer) { }

  ngOnInit() {

    // RECARGAR LOS CSS Y JS PARA STARRR (RATING) AL CARGAR LA PAG 
    this.loadScript("assets/vendor/jquery/jquery.min.js", "js")
    this.loadScript("assets/vendor/bootstrap/css/bootstrap.min.css", "css")
    this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css", "css")

    this.peliculaService.getListar().subscribe(data => {
      data.forEach((pelicula, i) => {
        //P/C PELI CREO UNA PELI CON IMG
        let peliConImg = new PeliculaConImg();
        peliConImg.pelicula = pelicula;
        this.mostrarImagen(peliConImg);
        this.listPelisConImg[i] = peliConImg;
      })
    });
  }
  onClick = ($event: ClickEvent) => {
    this.puntuacion = $event.rating;
    this.mensaje = `Puntuacion: ` + this.puntuacion;
    this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
  };

  mostrarImagen(peliculaConImg: PeliculaConImg) {
    this.peliculaService.leerArchivo(peliculaConImg.pelicula.idPelicula).subscribe(data => {
      this.convertir(data, peliculaConImg);
    });
  }

  //transforma la data en un archivo de lectura de js
  convertir(data: any, pelicula: PeliculaConImg) {
    var reader = new FileReader(); //transforma al arcvhio con FileReader
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let x:any;
      x = reader.result;
      //proteje la url para que puede ser accesible y leida por angular
      this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
      pelicula.imagen = this.imagenData;
    }
  }


  public loadScript(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
      var fileref = document.createElement('script')
      fileref.setAttribute("type", "text/javascript")
      fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
      let fileref = document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref)
  }

}
