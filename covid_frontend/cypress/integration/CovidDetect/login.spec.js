/// <reference types="cypress" />

const { type } = require("os")

const validUser = {
  email: 'carlossoria1999@gmail.com',
  password:'8soptativa'
}

describe('inicio' ,() => {
  it('succesful login', () =>{
    cy.visit('/')  //Visita la pagina principal
    cy.get('.button-solid').click() // Clickea en el boton login
    cy.get(':nth-child(1) > .item ').type(validUser.email) // valida el correo
    cy.get(':nth-child(2) > .item').type(validUser.password) // valida la password
    cy.get('#Continuar').click()
    cy.get('.alert-button').click()
  //  cy.get('#alert-4-msg').should('have.text', 'Inicio de sesión exitoso' )
    cy.get('ion-content.md > ion-card.md > ion-card-header.ion-inherit-color > .ion-inherit-color').should('include.text', 'Asistente de detección de COVID')
   cy.contains('Elegir archivo').click()

   cy.get('#selecionar > input').should('have.text', 'Elegir archivo')
  })  
})