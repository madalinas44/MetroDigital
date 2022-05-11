/// <reference types="cypress" />

export class ProductListsPage {
    accessProductAtPosition(position : string){
        cy.xpath('//*[@id="products-listing-list"]//li[%s]'.replace('%s', position).trim()).should('be.visible').click()
    }

    filterBySize(size : string){
        cy.xpath('//*[@id="sizeFilterOptions"]//*[@data-title="%s"]'.replace('%s', size).trim()).should('be.visible').click({force: true})
    }
}

export const onProductListsPage = new ProductListsPage()

