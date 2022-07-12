import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {UsuarioI} from '../../app/model/usuario.interface';
import {AuthenticateService} from '../services/authenticate.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  constructor(private activatedrouter:ActivatedRoute, private router:Router , private authService: AuthenticateService) { }

  datosusuario:UsuarioI;
  editarForm= new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
  });

  ngOnInit(): void {
    let usuarioid = this.activatedrouter.snapshot.paramMap.get('id')
  //  console.log(usuarioid);
  this.authService.getSingleuUser(usuarioid).subscribe(data =>{
   // console.log(data);
    this.datosusuario = data
  //  console.log(this.datosusuario)
    this.editarForm.setValue({
      'id': this.datosusuario.id,
      'title': this.datosusuario.title,
    })
  //  console.log(this.editarform.value)
    
  })
  }


  postForm(form:UsuarioI){
  console.log(form)
  }
}
