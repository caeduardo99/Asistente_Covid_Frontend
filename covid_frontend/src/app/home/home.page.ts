import { Component } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private file: File;
  constructor(private http: HttpClient) {}
  uploadPhoto(fileChangeEvent) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];
    // Create a form data object using the FormData API
    let formData = new FormData();
    // Add the file that was just added to the form data
    formData.append("photo", photo, photo.name);
    // POST formData to server using HttpClient
  }
  
  // onFileChange(fileChangeEvent) {
  //   this.file = fileChangeEvent.target.files[0];
  // }
  // async submitForm() {
  //  let formData = new FormData();
  // // formData.append("photo", this.file, this.file.name);
  //  this.http.post("http://localhost:3000/upload", formData).subscribe((response) => {
  //    console.log(response);
  //  });
  
  }





