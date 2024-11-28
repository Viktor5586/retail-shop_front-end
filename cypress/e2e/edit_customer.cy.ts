describe('Edit Customer E2E Tests', () => {
    const customer = {
        firstName: 'E2E',
        lastName: 'TEST',
        email: 'e2e@test.com',
        phoneNumber: '1234567890',
        updatedFirstName: 'E2E update'
      };
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.contains('.card', `${customer.firstName} ${customer.lastName}`)
        .find('button')
        .contains('Edit')
        .click();
    });
    it('should show the edit form with disabled "Created At" and "Updated At" fields', () => {
        cy.get('#createdAtInput').should('be.visible').and('be.disabled');
        cy.get('#updatedAtInput').should('be.visible').and('be.disabled');
    });
    it('should allow updating an enabled field and submitting the form', () => {
        cy.get('#firstNameInput').should('have.value', customer.firstName);
        cy.get('#lastNameInput').should('have.value', customer.lastName);
        cy.get('#emailInput').should('have.value', customer.email);
        cy.get('#phoneInput').should('have.value', customer.phoneNumber);
        cy.get('#firstNameInput').clear().type(customer.updatedFirstName);
        cy.get('form').submit();
    
        cy.visit('http://localhost:3000');
    
        cy.contains('.card', `${customer.updatedFirstName} ${customer.lastName}`).within(() => {
            cy.get('#customerEmail').should('contain.text', customer.email);
            cy.get('#customerPhone').should('contain.text', customer.phoneNumber);
        });
      });
});