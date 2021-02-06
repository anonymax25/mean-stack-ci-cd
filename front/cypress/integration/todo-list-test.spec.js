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

  it("should add new task", () => {
    cy.get('#name').type('do test');
    cy.scrollTo('bottom');
    cy.get(':nth-child(2) > .form-control').click();

    cy.get('#dropdownMenu').click();
    cy.get('.dropdown-menu > :nth-child(4)').click();
    // cy.get('.owl-dt-container-buttons > :nth-child(1) > .owl-dt-control-content')
    //   .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 });

    // cy.get(':nth-child(2) > .form-control').type('2/6/2021, 1:42 AM');

    // cy.get('.btn').should('be.visible');
    // cy.get('.btn').click();

  });

  // it("should have 1 task", () => {
  //   cy.get('body').find('.row > .p-3').should('have.length', 1);
  // });
  //
  // it("should delete the task", () => {
  //   cy.get('div > .btn').click();
  //   cy.get('body').find('.row > .p-3').should('have.length', 0);
  // });
});
