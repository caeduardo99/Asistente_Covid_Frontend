import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioI } from '../../app/model/usuario.interface';
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

  datosusuario: UsuarioI;
  editarForm = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl(''),
  });

  ngOnInit(): void {
    let usuarioid = this.activatedrouter.snapshot.paramMap.get('id');
    //  console.log(usuarioid);
    let token = this.getToken();
    console.log(token);
    this.authService.getSingleuUser(usuarioid).subscribe((data) => {
      // console.log(data);
      this.datosusuario = data[0];
      //  console.log(this.datosusuario)
      this.editarForm.setValue({
        nombre: this.datosusuario.Nombre,
        correo: this.datosusuario.Correo,
        dni: this.datosusuario.DNI,
        direccion: this.datosusuario.Direccion,
        codigoPostal: this.datosusuario.CodigoPostal,
        genero: this.datosusuario.Genero,
        telefono: this.datosusuario.Telefono,
        token: token,
        pacienteId: this.datosusuario.PacienteId,
        fechaNacimiento: this.datosusuario.FechaNacimiento,
      });
      // console.log(this.editarForm.value);
    });
  }

  postForm(form: UsuarioI) {
    //console.log(form);
    this.authService.putUsuario(form).subscribe((data) => {
      console.log(data);
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
