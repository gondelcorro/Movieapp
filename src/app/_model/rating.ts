import { Usuario } from './usuario';
import { Pelicula } from './pelicula';
export class Rating{
    public idRating:number;
    public rating:string;
    public pelicula: Pelicula;
    public usuario: Usuario;
}