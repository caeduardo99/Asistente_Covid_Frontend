import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserI } from '../../app/model/user.interface';
import { AuthenticateService } from '../services/authenticate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthenticateService
  ) {}

  datosusuario: UserI;
  editarForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    estado: new FormControl(''),
    // codigoPostal: new FormControl(''),
    // genero: new FormControl(''),
    // telefono: new FormControl(''),
    // token: new FormControl(''),
    // pacienteId: new FormControl(''),
    // fechaNacimiento: new FormControl(''),
  });

  ngOnInit(): void {
    let usuarioid = this.activatedrouter.snapshot.paramMap.get('id');
    //  console.log(usuarioid);
    let token = '1f684c6523f0e2a36c6835490eddbb96';
    console.log(token);
    this.authService.getSingleuUser(usuarioid).subscribe((data) => {
      // console.log(data);
      this.datosusuario = data[0];
      //  console.log(this.datosusuario)
      this.editarForm.setValue({
        nombre: this.datosusuario.nombre,
        apellido: this.datosusuario.apellido,
        email: this.datosusuario.email,
        estado: this.datosusuario.estado,
        // codigoPostal: this.datosusuario.CodigoPostal,
        // genero: this.datosusuario.Genero,
        // telefono: this.datosusuario.Telefono,
        // token: token,
        // pacienteId: this.datosusuario.PacienteId,
        // fechaNacimiento: this.datosusuario.FechaNacimiento,
      });
      // console.log(this.editarForm.value);
    });
  }

  postForm(form: UserI) {
    console.log(form);
   // this.authService.putUser(form).subscribe((data) => {
  //    console.log(data);
   // });
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
