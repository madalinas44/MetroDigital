/// <reference types="cypress" />

describe("Rest API Tests", () =>{
    let newEmployeeID

    it("Count empooyees over 30 years old", () =>{
        var countEmployees : number  = 0

        cy.request('GET','https://dummy.restapiexample.com/api/v1/employees')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null

            response.body.data.forEach(function (item) {
                if(item.employee_age >30){
                    countEmployees++
                }
                
            });
            cy.log("Number of employees over 30 is : " + countEmployees)
        })
    })

    it("Add a new employee over 30 and check that is successfull", () =>{

        //I don't think that this dummy API let us create users
        cy.request("POST", "https://dummy.restapiexample.com/api/v1/create", {"name":"Madalina S", "salary":"10000", "age": "32"})
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.message).to.eq("Successfully! Record has been added.")
            newEmployeeID = response.body.data.id
        })

        // this is not returning anything as if the employee is not added even though the previous request is successfull
        cy.request('GET','https://dummy.restapiexample.com/api/v1/employee/' + newEmployeeID)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.data.employee_name).to.eq("Madalina S") //this fails
        })
    })

    it("Update the Employee", () =>{
        cy.request("PUT", "https://dummy.restapiexample.com/api/v1/update/" + newEmployeeID, {"name":"Madalina S", "salary":"11000", "age": "32"})
        .then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.message).to.eq("Successfully! Record has been updated.")
        })
    })

    it("Count again empooyees over 30 years old", () => {
        var countEmployees : number  = 0

        cy.request('GET','https://dummy.restapiexample.com/api/v1/employees')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null

            response.body.data.forEach(function (item) {
                if(item.employee_age >30){
                    countEmployees++
                }
                
            });
            cy.log("Number of employees over 30 is : " + countEmployees) // will be the same because the reords are not added
        })
    })

    it("Delete the employee", () => {
        cy.request('DELETE','	https://dummy.restapiexample.com/api/v1/delete/' + newEmployeeID)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.message).to.eq("Successfully! Record has been deleted")
        })
    })
})