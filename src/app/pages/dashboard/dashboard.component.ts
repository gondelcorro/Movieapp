import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {

    // RECARGAR LOS CSS Y JS PARA STARRR (RATING) AL CARGAR LA PAG 
    this.loadScript("assets/vendor/jquery/jquery.min.js", "js")
    this.loadScript("assets/js/sb-admin.min.js", "js")
    this.loadScript("assets/vendor/bootstrap/css/bootstrap.min.css", "css")
    //this.loadScript("assets/vendor/fontawesome-free/css/all.min.css", "css")
    //this.loadScript("assets/datatables/dataTables.bootstrap4.css", "css")
    this.loadScript("assets/css/sb-admin.css", "css")
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
