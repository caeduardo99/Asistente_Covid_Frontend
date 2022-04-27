import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { Geolocation ,Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  
  // Definición de variables para consumo de apis
  private _usuario: Usuario;
  url1 = 'https://ia-backend-covid.herokuapp.com/api/usuario';
  url2 = "https://ia-backend-covid.herokuapp.com/"
  
  private _token: string;
  lat:number
  lon:number

  constructor(public http: HttpClient,public geolocation:Geolocation) {
    
   }

   // Creación del Metodo para el Registro del Usuario
   addPost(data) {
    
    return new Promise((resolve, reject) => {
      const httpHeaders= new HttpHeaders({
        "Content-Type": "application/json"})
      this.http.post(this.url1, JSON.stringify(data),{headers: httpHeaders}).subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }


 

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem("usuario") != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }


  
  // Creacion metodo para el logeo del usuario con las credenciales del backend
  getPosts(usuario: Usuario) {
    const urlEndpoint =  this.url2 + "oauth/token";
    
    const credenciales = btoa("angularapp" + ":" + "12345");

    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + credenciales,
    });

    let params = new URLSearchParams();
    params.set("grant_type", "password");
    params.set("username", usuario.email);
    params.set("password", usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), {
      headers: httpHeaders,
    });
  }
 

  // creacion metodo guardar usuario
  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    console.log(payload);
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.cedula = payload.cedula;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.institucion = payload.institucion;
    this._usuario.direccion = payload.direccion;
    this._usuario.telefono = payload.telefono;
    this._usuario.latitud = payload.lat;
    this._usuario.longitud = payload.lon;
    this._usuario.email = payload.email;
    this._usuario.password = payload.password;
   
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
  }

  


  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }
 

 guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.email && payload.email.length > 0) {
      return true;
    }
    return false;
  }


  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }


  //Metodo post imagen
  public post(url:string, body){
    
    return this.http.post(url,body); // POST  
  }



  obtenerPrediction(url:string, body) {
    let json = JSON.stringify(body);
    let params = json;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });
    return this.http
      .post(url ,  body)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

}
