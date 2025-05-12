  export function login() {
    cy.visit('https://beta.snippetsentry.com/login');
    cy.get('#input-v-2').clear();
    cy.get('#input-v-2').type('bitofreedom@gmail.com');
    cy.get('#input-v-4').clear();
    cy.get('#input-v-4').type('Password123!');
    cy.get(':nth-child(2) > .v-btn').click();
    cy.get('[data-testid="nav-manageusers"] > a > .nav-item-title').click();
  }

  export function navigateToManageUsers() {
    cy.get('[data-testid="nav-manageusers"] > a > .nav-item-title').should('be.visible');
    cy.get('[data-testid="nav-manageusers"] > a > .nav-item-title').click();
  }

  export function navigateToDashboard() {
    cy.get('[data-testid="nav-dashboard"] > a > .nav-item-title').should('be.visible');
    cy.get('[data-testid="nav-dashboard"] > a > .nav-item-title').click();
  }

  export function checkForConfirmation() {
    cy.get(':nth-child(2) > :nth-child(3) > .d-flex > [data-testid="user-name-in-list"] > .v-btn__content').should('be.visible');
  }

  export function createUser(fName, lName, email) {
    cy.get('#button-addNewUser > .v-btn__content').click();
    cy.get('#textfield-adduser-firstname').clear();
    cy.get('#textfield-adduser-firstname').type(fName);
    cy.get('#textfield-adduser-lastname').clear();
    cy.get('#textfield-adduser-lastname').type(lName);
    cy.get('#textfield-adduser-email').clear();
    cy.get('#textfield-adduser-email').type(email);
    cy.get('[data-testid="save-user"] > .v-btn__content').click();
  }

  export function deleteUser(email) {

    cy.get(':nth-child(2) > :nth-child(3) > .d-flex > [data-testid="user-name-in-list"] > .v-btn__content').click();
      
    cy.get('[data-testid="delete-user-button"] > .v-btn__content').click();
    cy.get('[data-testid="confirm"] > .v-btn__content').should('be.visible');
    cy.get('[data-testid="confirm"] > .v-btn__content').click();
    cy.get(':nth-child(2) > :nth-child(3) > .d-flex > [data-testid="user-name-in-list"] > .v-btn__content')
  }