import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  url = '172.16.71.49:8080/api/usuario/squevedo8524@gmail.com';
 
  constructor(public http: HttpClient) {

   }
  getPosts(){
    return new Promise(resolve=>{
      this.http.get(this.url).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }
}
