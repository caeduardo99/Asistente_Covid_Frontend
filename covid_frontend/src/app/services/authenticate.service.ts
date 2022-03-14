import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  url1 = 'http://172.16.71.49:8080/api/usuario';
  url2 = "http://172.16.71.49:8080/api/usuario/email"

  //public credenciales: string;
  
  constructor(public http: HttpClient) {
    credenciales : String
   }

   addPost(data) {
    return new Promise((resolve, reject) => {
      const httpHeaders= new HttpHeaders({
        "Content-Type": "application/json"})
      this.http.post(this.url1, JSON.stringify(data),{
        headers: httpHeaders
      })
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getPosts(data){
    return new Promise(resolve=>{
      const urlEndpoint = this.url2 + "oauth/token"
      const credenciales=btoa("angularapp" + ":" + "12345");
      const httpHeaders= new HttpHeaders({
        "Content-Type": "application/json"})
       let params = new URLSearchParams();
       params.set("grant_type", "password");
       params.set("username",  data.email);
      params.set("password", data.password);

      this.http.post(urlEndpoint,params.toString(),{
        headers: httpHeaders
      }).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }
 
}
