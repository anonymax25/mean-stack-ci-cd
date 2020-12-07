describe("Todo-list test", () => {

  it("button add should be disable", () => {
    cy.visit("/login");

    cy.get('#name').type('userTest');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.get('.btn-dark').should('be.disabled');
  });

  it("should add a new task", () => {
    cy.get('#name').type('do unit test');
    cy.get('#days').type('20');
    cy.get('form.ng-dirty > .btn').click();
  });

  it("should have 1 task", () => {
    cy.get('body').find('.row > .p-3').should('have.length', 1);
  });

  it("should delete the task", () => {
    cy.get('div > .btn').click();
    cy.get('body').find('.row > .p-3').should('have.length', 0);
  });
});
