import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators 
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm:FormGroup;
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
     
  constructor(private formBuilder: FormBuilder) {
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
   loginUser(credentials){
     console.log(credentials);
   }
}
