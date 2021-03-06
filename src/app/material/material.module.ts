import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
    //AGREGAR EL EXPORTS TB PARA LOS COMP DE ANG MAT SI O SI
    exports: [
      MatSidenavModule,
      MatSnackBarModule
    ],
  declarations: []
})
export class MaterialModule { }
