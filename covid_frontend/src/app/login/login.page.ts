import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm:FormGroup;
  arrayPosts:any;
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

  constructor(private formBuilder: FormBuilder,private authService:AuthenticateService, private navCtrl:NavController) {
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
   }
   ionViewDidLoad() {
    this.getPosts();//Llamamos a la función getPost cuando la vista se cargue
  }
   getPosts() { //llamamos a la funcion getPost de nuestro servicio.
    this.authService.getPosts()
    .then(data => {
      this.arrayPosts = data;
    });
  }
    loginUser(){
      this.authService.getPosts().then(res=>{
        this.errorMessage="";
        this.navCtrl.navigateForward("home");
      })
    }
}
