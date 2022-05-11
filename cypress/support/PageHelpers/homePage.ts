/// <reference types="cypress" />

export class HomePage {

    acceptCookies(){
        cy.get('#accept-cookie-policy').click()
    }

    chooseChlothingCategory(category : string, subcategory: string){
        cy.xpath('//*[@id="main-menu"]//li/span[contains(text(),"%s")]'.replace('%s', category).trim()).should('be.visible').click({force: true})
        cy.xpath('//*[@id="main-menu"]//*[text()="%s"]'.replace('%s', subcategory).trim()).should('be.visible').click({force: true})
    }

    goToCart(){
        cy.get('#customer-basket').should('be.visible').click({force: true})
    }

    getProductNumberOnCart() {
         return cy.get('#prodCartCountHeader').invoke('text')
    }

}
export const onHomePage = new HomePage()