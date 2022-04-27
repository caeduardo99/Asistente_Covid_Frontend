/// <reference types="cypress" />

const { type } = require("os")

const validUser = {
  cedula: '1234567890',
  nombre: 'Josue',
  apellidos: 'Carpio',
  institucion: 'Clinica Santa Ines',
  direccion: 'Padre Aguirre',
  telefono: '0969034831',
  email: 'soria1999@gmail.com',
  emailconf: 'soria1999@gmail.com',
  password:'8soptativa',
  passwordconf:'8soptativa'
}

describe('inicio' ,() => {
  it('succesful resgister', () =>{
    cy.visit('/')  //Visita la pagina principal
    cy.get('.button-outline').click() // Clickea en el boton registro
    cy.get(':nth-child(1) > .item-interactive').type(validUser.cedula) // valida la cedula
    cy.get(':nth-child(2) > .item-interactive').type(validUser.nombre) // valida la nombres
    cy.get(':nth-child(3) > .item-interactive').type(validUser.apellidos) // valida la apellidos
    cy.get(':nth-child(4) > .item-interactive').type(validUser.institucion) // valida la institucion
    cy.get(':nth-child(5) > .item-interactive').type(validUser.direccion) // valida la direccion
    cy.get(':nth-child(6) > .item-interactive').type(validUser.telefono) // valida la telefono
    cy.get(':nth-child(7) > .item-interactive').type(validUser.email) // valida la email
    cy.get(':nth-child(8) > .item-interactive').type(validUser.emailconf) // valida la confirmacion email
    cy.get(':nth-child(9) > .item-interactive').type(validUser.password) // valida la password
    cy.get(':nth-child(10) > .item-interactive').type(validUser.passwordconf) // valida la confirmacion del password
  })  
})