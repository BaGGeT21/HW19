import {faker} from '@faker-js/faker';

context('QA Auto', () => {
    const randomEmail= faker.internet.email();
    const randomPass = faker.internet.password({length: 10})+ '1Aa';
    const randomFN = faker.person.firstName({length: 10});
    const randomLN = faker.person.lastName({length: 10});

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
    })

    it('Registration',() => {

        //Search and click "Sign Up" button
        cy.get('.hero-descriptor_btn')
        .should('exist')
        .click();

        //Fill out registration form
        cy.get('.modal-title').should('have.text', 'Registration');
        cy.get('#signupName').type(randomFN);
        cy.get('#signupLastName').type(randomLN);
        cy.get('#signupEmail').type(randomEmail);
        cy.get('#signupPassword').type(randomPass);
        cy.get('#signupRepeatPassword').type(randomPass);
        cy.get('.modal-footer > .btn').should('have.text', 'Register')
        .click();

        //Check profile name
        cy.get('a.btn-sidebar.sidebar_btn.-profile').click();
        cy.get('.profile_name').should('contain', randomFN + " " + randomLN);

        //Add a car
        cy.get('a.btn-sidebar.sidebar_btn[routerlink="garage"]').click();
        cy.get('.btn-primary').should('contain', 'Add car')
        .click();

        cy.get('#addCarBrand').select('Fiat');
        cy.get('#addCarModel').select('Palio');
        cy.get('#addCarMileage').type('1');
        cy.get('.modal-footer > .btn-primary').should('contain', 'Add')
        .click();

        //Add an expense
        cy.get('a.btn-sidebar.sidebar_btn[routerlink="expenses"]').click();
        cy.get('.item-group > .btn-primary').should('have.text', 'Add an expense')
        .click();
        cy.get('input[name="mileage"]').type('3');
        cy.get('input[name="liters"]').type('2');
        cy.get('input[name="totalCost"]').type('2');
        cy.get('.modal-footer > .btn-primary').should('have.text', 'Add')
        .click();

        //Delete profile
        cy.contains('.sidebar_btn', 'Settings').click();
        cy.contains('.btn-danger-bg', 'Remove my account').click();
        cy.contains('.btn-danger', 'Remove').click();
        

    })

})