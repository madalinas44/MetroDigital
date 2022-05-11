/// <reference types="cypress" />

export class ProductPage {

    chooseProductSize(size : string){
        cy.xpath('//*[@id="sizeDrop"]').should('be.visible').should('be.visible').click({force: true})
        cy.xpath('//*[@id="sizeContainer"]//label[@value="%s"]'.replace('%s', size).trim()).should('be.visible').click({force: true})
    }

    addToCart(){
        cy.get('#buy-box').should('be.visible').click({force: true})
    }
}

export const onProductPage = new ProductPage()