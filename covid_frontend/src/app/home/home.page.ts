import { Component } from '@angular/core';
import { AlertController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public previsualizacion: string;
  public archivos: any = [];
  public loading: boolean

  address: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public alertController: AlertController,
    private menu: MenuController,
    private authService:AuthenticateService
    
    
  ) {}
 
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.archivos.push(archivoCapturado);
    // console.log(event.target.files);
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

    subirArchivo(): any {
      try {
       
        const formularioDeDatos = new FormData();
        this.archivos.forEach(archivo => {
          formularioDeDatos.append('files', archivo)
          console.log(archivo);
        })
       
        this.authService.post("http://172.16.71.49:8080/api/upload", formularioDeDatos)
          .subscribe(res => {  
            console.log('Respuesta del servidor', res);
  
          }, () => {
            this.loading = false;
            alert('Error');
          })
      } catch (e) {
        this.loading = false;
        console.log('ERROR', e);
  
      }
    }
}
