describe('Delete Customer E2E Tests', () => {
    const customer = {
        firstName: 'E2E',
        lastName: 'DELETE_TEST',
        email: 'e2e@test.com',
        phoneNumber: '1234567890',
      };
    beforeEach(() => {
      cy.visit('http://localhost:3000/add-customer');
    });
    it('should allow submitting the form with valid data and show the customer on the homepage', () => {
        cy.get('#firstNameInput').type(customer.firstName);
        cy.get('#lastNameInput').type(customer.lastName);
        cy.get('#emailInput').type(customer.email);
        cy.get('#phoneInput').type(customer.phoneNumber);
        cy.get('form').submit();
        cy.wait(1500);
    })
    it('should delete the customer that was just created when the delete button is clicked', () => {
        cy.visit('http://localhost:3000');
        cy.contains('.card', `${customer.firstName} ${customer.lastName}`)
          .find('button')
          .contains('Delete')
          .click();
        cy.contains('.card', `${customer.firstName} ${customer.lastName}`).should('not.exist');
    })
});