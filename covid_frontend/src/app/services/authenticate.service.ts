import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private _usuario: Usuario;
  url1 = 'http://172.16.71.49:8080/api/usuario';
  url2 = "http://172.16.71.49:8080/"

  private _token: string;
 

  
  constructor(public http: HttpClient) {
    
   }

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
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
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



  public post(url:string, body){
    return this.http.post(url,body); // POST  
  }

}
