import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // RECARGAR LOS CSS Y JS PARA STARRR (RATING) AL CARGAR LA PAG 
    this.loadScript("assets/vendor/jquery/jquery.min.js", "js")
    this.loadScript("assets/js/starrr.js", "js")
    this.loadScript("assets/js/starrImpl.js", "js")
    this.loadScript("assets/vendor/bootstrap/css/bootstrap.min.css", "css")
    this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css", "css")
    this.loadScript("assets/css/starrr.css", "css")
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
