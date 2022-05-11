/// <reference types="cypress" />

export class CartPage {
    checkNumberOfProductsOnCart(number : Number){
        cy.get('div[class="cart-product-box "]').should('have.length', number)
    }

    deleteProductAtPosition(position : number){
        cy.xpath('//*[@class="cart-product-actions"]//*[@title="Sterge"]').eq(position).should('be.visible').click({force: true})
    }
}

export const onCartPage = new CartPage()