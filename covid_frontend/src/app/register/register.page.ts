import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  
} from "@angular/forms";
import { AuthenticateService } from "../services/authenticate.service";
import { NavController,AlertController } from "@ionic/angular";
import { Storage } from '@ionic/storage-angular';
import { Usuario } from "../model/Usuario";
import { Geolocation ,Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  private _usuario: Usuario;
  lat:number
  lon:number
  validation_messages = {
    email: [
      { type: "required", message: " El email es requerido" },
      { type: "pattern", message: "ojo! este no es un email válido" }
    ],
    password: [
      { type: "required", message: " El password es requerido" },
      { type: "minlength", message: "Minimo 5 letras para el password" }
    ],
    nombre: [
      { type: "required", message: " El nombre es requerido" }
     
    ],
    apellido: [
      { type: "required", message: " El apellido es requerido" }
     
    ],
    institucion: [
      { type: "required", message: " La institucion es requerida" }
     
    ],
    cedula: [
      { type: "required", message: " La cédula es requerida" }
    ],
    direccion: [
      { type: "required", message: " La dirección es requerida" }
    ],
    telefono: [
      { type: "required", message: " El teléfono es requerida" }
    ]


  };
  errorMessage: string = "";
  arrayPosts:any; 
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
    public geolocation:Geolocation
     ) {
    this.registerForm = this.formBuilder.group({
      cedula: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      nombre: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern("[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$")])
      ),

      apellido: new FormControl(
        "",
        Validators.compose([Validators.required,Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern("[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$")])
      ),
      institucion: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern("[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$")])
      ),
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]),
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      direccion: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      telefono: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      latitud: new FormControl(
        
     
      ),
    });
  }

 
  goToLogin(){
    this.router.navigate(['/login'], { skipLocationChange: true });
  }


  guardarDatos(){
    this._usuario = new Usuario();
    this._usuario.cedula = this.registerForm.value.cedula
    this._usuario.nombre = this.registerForm.value.nombre
    this._usuario.apellido = this.registerForm.value.apellido
    this._usuario.institucion = this.registerForm.value.institucion    
    this._usuario.direccion = this.registerForm.value.direccion
    this._usuario.telefono = this.registerForm.value.telefono
    this._usuario.email = this.registerForm.value.email
    this._usuario.password = this.registerForm.value.password
    this._usuario.latitud=this.lat
    this._usuario.longitud=this.lon
    this.authService.addPost(this._usuario);
    
   
  }

  obtenerUbicacion(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;

      console.log(this.lat);
      console.log(this.lon);
    });
  }

  ngOnInit() {
    
    
   }

}
