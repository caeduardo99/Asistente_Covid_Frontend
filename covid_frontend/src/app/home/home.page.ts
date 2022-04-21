import { Component, OnInit } from '@angular/core';
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
export class HomePage implements OnInit {
  public previsualizacion: string;
  public image: string;
  public archivos: any = [];
  public loading: boolean
  lat:number
  lon:number
  public latitud: any = [];
  private attributes: string[];
  accuracy: number;
  constructor(
  private http: HttpClient,
  public DomSanitizer: DomSanitizer,
  private alertController: AlertController,
  private menu: MenuController,
  private authService:AuthenticateService,
  
    

    
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
   
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.DomSanitizer.bypassSecurityTrustUrl(unsafeImg);
        
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
       // el archivo capturado lo convertimos en binario para ser enviado al backEnd
    subirArchivo(): any {
      try {
        this.loading = true;
        const formularioDeDatos = new FormData();
        this.archivos.forEach(archivo => {
        formularioDeDatos.append('archivo', archivo)
        })
        
        this.authService.post("http://172.16.71.49:8080/api/upload", formularioDeDatos)
          .subscribe(res => {
            this.loading = false;
            console.log('Respuesta del servidor', res);}, () => 
          {
            this.loading = false;
            alert('Error');
          })
      } 
      catch (e) {
        this.loading = false;
        console.log('ERROR', e);
  
      }
    }
    
    
  

}
