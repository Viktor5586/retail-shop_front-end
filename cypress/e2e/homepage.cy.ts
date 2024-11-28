describe('Homepage E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the header and "New Customer" button', () => {
    cy.contains('Customer Management').should('be.visible');
    cy.contains('New Customer')
      .should('be.visible')
      .and('have.class', 'btn-primary');
  });

  it('should display customer cards', () => {
    cy.get('.card').should('have.length.at.least', 1);
    cy.get('.card').first().within(() => {
      cy.get('.card-title').should('exist');
      cy.get('.card-text').should('exist');
    });
  });

  it('should navigate to "Add Customer" page when clicking "New Customer"', () => {
    cy.contains('New Customer').click();
    cy.url().should('include', '/add-customer');
  });

  it('should navigate to the "Edit Customer" page when clicking "Edit"', () => {
    cy.get('.btn-warning').first().click();
    cy.url().should('include', '/edit-customer');
  });

  it('should navigate to "View Orders" page when clicking "View Orders"', () => {
    cy.get('.btn-info').first().click();
    cy.url().should('include', '/orders/');
  });
});
