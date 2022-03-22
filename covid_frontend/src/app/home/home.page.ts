import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
 
  
  ngOnInit() {
    
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
        this.loading = true;
        const formularioDeDatos = new FormData();
        this.archivos.forEach(archivo => {
          formularioDeDatos.append('archivo', archivo)
        })
        
        this.authService.post("https://ia-backend-covid.herokuapp.com/api/upload", formularioDeDatos)
          .subscribe(res => {
            this.loading = false;
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
