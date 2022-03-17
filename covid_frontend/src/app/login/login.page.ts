import { Component, OnInit } from '@angular/core';

import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../model/usuario';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  
  loginForm:FormGroup;
  usuario: Usuario;
  cargado = false;
  
  validationMessages = {
    email: [
      {
        type: 'required', message: 'El email es requerido'
      },
      {
        type: 'pattern', message: 'El email es incorrecto'
      }],
      password: [
        {
          type: 'required', message: 'El password es requerido'
        },
        {
          type: 'minLength', message: 'Tamaño minimo 5 caracteres'
        }],
     };
     errorMessage:string="";

  constructor(private formBuilder: FormBuilder,private authService:AuthenticateService, private navCtrl:NavController, private storage:Storage,private router: Router) {
    this.usuario = new Usuario();
    this.loginForm = this.formBuilder.group({
     
      email: new FormControl(
        "",
        Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])
      ),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
    })
   }
  
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/login");
     
      
    }

   }
   
   login(event: Event): void {
    this.cargado = true;
    event.preventDefault();
    
    if(this.loginForm.valid){

    this.usuario.email = this.loginForm.value.email;
    this.usuario.password = this.loginForm.value.password;
    this.authService.getPosts(this.usuario).subscribe(
      (response) => {
        

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
   
        this.router.navigate(["/menu/home"]);

       
        
        this.cargado = false;
      },
      (err) => {
       
        if (err.status == 400) {
     //     Swal.fire("Error Login", "Usuario o clave incorrectas!", "error");
        }
        if (err.status == 0) {
      //    Swal.fire("Servicio", "No Disponible", "error");
        }
        this.cargado = false;
      });
    
     
  }
}

    gotoRegister() {
      this.navCtrl.navigateForward("/register");
    }
}
