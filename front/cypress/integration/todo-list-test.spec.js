describe("Todo-list test", () => {

  it("button add task should be disable", () => {
    cy.visit("/sign-in");
    cy.get('[type="email"]').type('cypressTest@gmail.fr');
    cy.get('#password').type('password');
    cy.get('.fourth').click();

    cy.get('.text-light').should('have.text','Vous n\'avez aucune tâche !');
    cy.get('#name').should('have.value', '');
    cy.get('.btn').should('be.disabled');

  });

  it("should have 0 task", () => {
    cy.get('#name').type('do test');
    cy.scrollTo('bottom');
    cy.get('.container').find(':nth-child(4) > .card > .card-body').should('have.length', 0);

    cy.get('#dropdownMenu').click();
    cy.get('.dropdown-menu > :nth-child(4)').click();
  });
});
