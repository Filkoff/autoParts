describe('Dealer registration', () => {
  it('Register', () => {
    cy.visit('/registration');
    cy.get('#name').type('john');
    cy.get('#email').type('donavan@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#type').select('customer');
    cy.get('#registrationButton').click();
  });

  it('Log in', () => {
    cy.visit('/login');
    cy.get('#email').type('donavan@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#login').click();
  });

  it('Search parts', () => {
    cy.get('#category').select('ВЫПУСКНАЯ СИСТЕМА');
    cy.get('#model').type('vesta');
    cy.get('#name').type('катализатор');
    cy.get('#searchButton').click();
    cy.get('#searchResults').should('have.length', 1);
  });

  it('Sort by distance', () => {
    cy.visit('/login');
    cy.get('#email').type('donavan@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#login').click();
    cy.get('#searchButton').click();
    cy.get('#sortByDistButton').click();
  });

    it("Compare", () => {
      cy.visit("/main");
      cy.get("#compareTab").click();
      cy.get("#category").select("ВЫПУСКНАЯ СИСТЕМА");
      cy.get("#model").type("vesta");
      cy.get("#name").type("катализатор");
      cy.get("#compareButton").click();
    });
});
