describe('Login Page:', () => {
  it('should login to the journal with the correct credentials.', () => {
    cy.visit('/');
    cy.get('#username').type('mario');
    cy.get('#password').type('1234');
    cy.get(':nth-child(3) > .w-full').click();
    cy.contains('Workout journal');
  });
});
