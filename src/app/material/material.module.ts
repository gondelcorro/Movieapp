import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
    //AGREGAR EL EXPORTS TB PARA LOS COMP DE ANG MAT SI O SI
    exports: [
      MatSidenavModule
    ],
  declarations: []
})
export class MaterialModule { }
