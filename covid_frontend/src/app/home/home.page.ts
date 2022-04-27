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
  public previsualizacion2: string;
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
  // Capturamos el evento de "subir la radografia". Al subir una foto, es decir, seleccionarla
  // desde nuestros archivos, se ejecutará esta función, que lo que hace es obtener el archivo
  // que se ha subido desde el evento, y luego llamar a la función extraerBase64(), para que nos
  // devuelva la imagen codificada en Base64.
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    
    });
    this.archivos.push(archivoCapturado);
   
  }
  // Convertimos el evento (imagen) a Base64.
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
      
    subirArchivo(): any {
      try {
      // this.loading = true;
        const formularioDeDatos = new FormData();
        this.archivos.forEach(archivo => {
        formularioDeDatos.append('archivo', archivo)
        })
        
        this.authService.obtenerPrediction("http://172.16.110.134:8080/api/upload", formularioDeDatos)
          .subscribe(response => {
           // this.loading = false;
           //var respuesta= JSON.parse(response.toString())
            //console.log('Respuesta del servidor',response["prediccion"]);
            this.previsualizacion2=response["prediccion"]
              console.log(this.previsualizacion2);
            this.previsualizacion2="data:image/jpeg;base64,"+this.previsualizacion2
       
            // this.previsualizacion2=response+"";
            // console.log(this.previsualizacion2);
            
          }, () => 
          {
           // this.loading = false;
             alert('Error');
          })
      } 
      catch (e) {
      
        console.log('ERROR', e);
  
      }
    }
    
    loadImages = () => {
      try {

        const formData = new FormData();
        this.archivos.forEach((archivo) => {
          formData.append('archivo', archivo)
        });
        this.loading = true;
        this.authService.post("http://172.16.71.49:8080/api/upload", formData)
          .subscribe(res => {
            console.log('Respuesta del servidor', res);
            this.loading = false;
            console.log('Carga exitosa');
  
  
          });
      } catch (e) {
        console.log('ERROR', e);
  
      }
    }


    
}
