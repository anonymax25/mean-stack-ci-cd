describe("Authentication test", () => {

  it("should redirect in sign-up page", () => {
    cy.visit("/login");

    cy.get(':nth-child(2) > .nav-link').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')
      expect(loc.origin).to.eq('http://localhost:4200')
      expect(loc.href).to.eq('http://localhost:4200/signup')
    })
  });

  it("should create a new userTest", () => {
    cy.get('#name').type('userTest');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')
      expect(loc.origin).to.eq('http://localhost:4200')
      expect(loc.href).to.eq('http://localhost:4200/login')
    })
  });

  it("should login with userTest", () => {
    cy.get('#name').type('userTest');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')
      expect(loc.origin).to.eq('http://localhost:4200')
      expect(loc.href).to.eq('http://localhost:4200/todolist')
    })
  });

  it("should be connected as userTest", () => {
    cy.get('body').find(':nth-child(3) > .btn').contains('Log in as: userTest');
  });

  it("should logout", () => {
    cy.get(':nth-child(2) > .nav-link').click();

    cy.location().should((loc) => {
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')
      expect(loc.origin).to.eq('http://localhost:4200')
      expect(loc.href).to.eq('http://localhost:4200/login')
    })
  });
});
