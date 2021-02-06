describe("Profile test", () => {

  it("should redirect to profile page", () => {
    cy.visit("/sign-in");
    cy.get('[type="email"]').type('cypressTest@gmail.fr');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.get('#dropdownMenu').click();
    cy.get('.dropdown-menu > :nth-child(1)').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200');
      expect(loc.protocol).to.eq('http:');
      expect(loc.origin).to.eq('http://localhost:4200');
      expect(loc.href).to.eq('http://localhost:4200' + loc.pathname);
    });
  });

  it("should have correct information", () => {
    cy.get('.card-body > :nth-child(4)').should('have.text', 'Adresse e-mail : cypressTest@gmail.fr');
    cy.get('.card-body > :nth-child(5)').should('have.text', 'Prénom : userTest');
    cy.get('.card-body > :nth-child(6)').should('have.text', 'Nom : Cypress');
  });

  it("should suppress account", () => {
    cy.get('.justify-content-end > .btn').click();
    cy.get('#password').type('password');
    cy.get('.modal-footer > .btn-danger').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200');
      expect(loc.protocol).to.eq('http:');
      expect(loc.origin).to.eq('http://localhost:4200');
      expect(loc.href).to.eq('http://localhost:4200/sign-in');
    });
  });

  it("should not sign-in", () => {
    cy.get('[type="email"]').type('cypressTest@gmail.fr');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.get('.alert').should('have.text', ' L\'adresse e-mail ou le mot de passe est incorrect ! ');
  });
});
