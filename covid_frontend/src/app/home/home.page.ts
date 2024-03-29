import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { SwiperComponent } from 'swiper/angular';
import { ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { LoadingController } from '@ionic/angular';
import SwiperCore, { Pagination, EffectCube } from 'swiper';

SwiperCore.use([Pagination, EffectCube]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    pagination: true,
    slidesPerView: 'auto',
    effect: 'cube',
  };

  public previsualizacion: string;
  public previsualizacion2: string;
  public archivos: any = [];
  public loading: boolean;
  lat: number;
  lon: number;
  public latitud: any = [];
  private attributes: string[];
  accuracy: number;
  constructor(
    private http: HttpClient,
    public DomSanitizer: DomSanitizer,
    private alertController: AlertController,
    private menu: MenuController,
    private authService: AuthenticateService,
    public loadingCtrl: LoadingController
  ) {}

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
  swiperSlideChanged(e) {
    console.log('changed:', e);
  }
  touchAllowed = false;
  next() {
    this.swiper.swiperRef.slideNext(500);
  }
  prev() {
    this.swiper.swiperRef.slidePrev(500);
  }
  toogleTouch() {
    this.touchAllowed = !this.touchAllowed;
    this.swiper.swiperRef.allowTouchMove = this.touchAllowed;
  }
  ngOnInit() {}
  // Capturamos el evento de "subir la radiografia". Al subir una foto, es decir, seleccionarla
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
      this.showLoading();
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo) => {
        formularioDeDatos.append('archivo', archivo);
      });

      this.authService
        .post(
          'http://localhost:8080/api/upload',
          formularioDeDatos
        )
        .subscribe(
          (response) => {
            this.loadingCtrl.dismiss();
            this.previsualizacion2 = null;
            this.previsualizacion2 = response['prediccion'];
          //     console.log(this.previsualizacion2);
            this.previsualizacion2 =
              'data:image/jpeg;base64,' + this.previsualizacion2;
            // this.previsualizacion2=response+"";
          //   console.log(this.previsualizacion2);

            this.ngOnInit();
           // this.previsualizacion2.reset();
          },
          () => {
            alert('Error');
          }
        );
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-class custom-loading ',
    });

    loading.present();
  }
}
