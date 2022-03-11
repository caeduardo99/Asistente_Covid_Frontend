import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { AuthenticateService } from "../services/authenticate.service";
import { NavController } from "@ionic/angular";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  registerForm: FormGroup;
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
    cedula: [
      { type: "required", message: " La cédula es requerida" }
    ],
    direccion: [
      { type: "required", message: " La diracción es requerida" }
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
    private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      cedula: new FormControl(
        "",
        Validators.compose([Validators.required,Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern("[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$")])
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
      
    });
  }

  
  addPosts() {
    this.authService.getPosts()
    ;
  }
}
