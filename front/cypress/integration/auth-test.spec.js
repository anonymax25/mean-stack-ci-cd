describe("Authentication test", () => {

  it("should redirect in sign-up page", () => {
    cy.visit("/sign-in");
    cy.get('.ml-auto > :nth-child(2) > .btn').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200');
      expect(loc.protocol).to.eq('http:');
      expect(loc.origin).to.eq('http://localhost:4200');
      expect(loc.href).to.eq('http://localhost:4200/sign-up');
    });
  });

  it("should create a new userTest", () => {
    cy.get('[type="email"]').type('cypressTest@gmail.fr');
    cy.get('[name="lastName"]').type('Cypress');
    cy.get('[name="firstName"]').type('userTest');
    cy.get('.ng-pristine').type('password');
    cy.get('.fourth').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200');
      expect(loc.protocol).to.eq('http:');
      expect(loc.origin).to.eq('http://localhost:4200');
      expect(loc.href).to.eq('http://localhost:4200/todo');
    });
  });

  it("should logout", () => {
    cy.get('#dropdownMenu').click();
    cy.get('.dropdown-menu > :nth-child(4)').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200');
      expect(loc.protocol).to.eq('http:');
      expect(loc.origin).to.eq('http://localhost:4200');
      expect(loc.href).to.eq('http://localhost:4200/sign-in');
    });
  });

  it("should sign-in", () => {
    cy.get('[type="email"]').type('cypressTest@gmail.fr');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')
      expect(loc.origin).to.eq('http://localhost:4200')
      expect(loc.href).to.eq('http://localhost:4200/todo')
    });

    cy.get(':nth-child(1) > .nav-item > .nav-link').should('have.text','Todo');
    cy.get('.navbar-brand').should('have.text','Todo List App');
    cy.get('.text-light').should('have.text','Vous n\'avez aucune tâche !');
    cy.get('#dropdownMenu').should('have.text', ' userTest ');

    cy.get('#dropdownMenu').click();
    cy.get('.dropdown-menu > :nth-child(4)').click();
  });
});
