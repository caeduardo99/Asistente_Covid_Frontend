export class Usuario {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  institucion: string;
  direccion: string;
  telefono: number;
  email: string;
  password: string;
  latitud: number;
  longitud: number;
  estado: boolean;
  roles: string[] = [];
}
