/// <reference types="cypress" />

import { onHomePage } from "../../support/PageHelpers/homePage"
import { onProductPage } from "../../support/PageHelpers/productPage"
import { onCartPage } from "../../support/PageHelpers/cartPage"
import { onProductListsPage } from "../../support/PageHelpers/productsListsPage"

describe("Add products to cart", () =>{
    before('Go to FashionDays', () =>{
        cy.clearCache()
        cy.intercept("GET", "https://cm.teads.tv/**", {})
        cy.intercept("GET", "https://ct.pinterest.com/**", {})
        cy.intercept("GET", "https://widget.fitanalytics.com/**", {})
        cy.intercept("POST", "https://activity.wisepops.com/**", {})

        cy.visit('https://www.fashiondays.ro/')
        onHomePage.acceptCookies()
    })

    it('Add two product to cart', ()=>{
        onHomePage.chooseChlothingCategory('Imbracaminte','Bluze')
        onProductListsPage.filterBySize('S')
        onProductListsPage.accessProductAtPosition('1')
        onProductPage.chooseProductSize('S')
        onProductPage.addToCart()
        onHomePage.getProductNumberOnCart().should('eq', '1')

        onHomePage.chooseChlothingCategory('Incaltaminte','Cizme')
        onProductListsPage.filterBySize('38')
        onProductListsPage.accessProductAtPosition('1')
        onProductPage.chooseProductSize('38')
        onProductPage.addToCart()
        onHomePage.getProductNumberOnCart().should('eq', '2')
    
        onHomePage.goToCart()
        onCartPage.checkNumberOfProductsOnCart(2)
        onCartPage.deleteProductAtPosition(1)
        onCartPage.checkNumberOfProductsOnCart(1)
        onHomePage.getProductNumberOnCart().should('eq', '1')
    
        onCartPage.deleteProductAtPosition(0)
        onCartPage.checkNumberOfProductsOnCart(0)
        onHomePage.getProductNumberOnCart().should('eq', '')
    
    })

    it("Remove non-exitent product from cart - failed", () =>{
        onHomePage.goToCart()
        onCartPage.deleteProductAtPosition(0)

    })

})