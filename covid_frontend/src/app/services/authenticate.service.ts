import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  url1 = 'http://172.16.71.49:8080/api/registro';
  
  constructor(public http: HttpClient) {

   }

  addPost(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url1, JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  getPosts(){
    return new Promise(resolve=>{
      this.http.get(this.url1).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }

 
}
