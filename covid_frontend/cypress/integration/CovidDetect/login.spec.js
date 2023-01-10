/// <reference types="cypress" />

const { type } = require("os")

const validUser = {
  email: 'wendy@gmail.com',
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
    cy.get('.caption').should('include.text', ' Assistant to  COVID 19 ')
   
  })  
})