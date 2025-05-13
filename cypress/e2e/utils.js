// This file contains utility functions for Cypress tests.

/**
 * Logs in a user by visiting the login page, entering credentials, and verifying login success.
 * @param {string} username - The username to log in with.
 * @param {string} password - The password to log in with.
 */
export function login(username, password) {
  visitPage('login')
  // cy.get('#input-v-2').clear().type(username);
  cy.get('[class="v-field__input"]').eq(0).clear().type(username);
  cy.get('[type="password"]').clear().type(password);
  cy.contains('Login').should('be.visible').click();
  // Verify login success
  cy.contains('SnippetSentry').should('be.visible');
}

/**
 * Logs out the currently logged-in user by interacting with the profile badge and logout button.
 */
export function logout() {
  cy.get('[data-testid="profile-badge"]').should('be.visible').click();
  cy.get('[data-testid="profile-logout"]').should('be.visible').click();
}

/**
 * Visits a specific page by its path.
 * @param {string} pagePath - The path of the page to visit.
 */
export function visitPage(pagePath) {
  cy.visit(`https://beta.snippetsentry.com/${pagePath}`);
}

/**
 * Navigates to a page by clicking a link with the given name.
 * @param {string} linkName - The visible name of the link to click.
 */
 export function navigateToPageLink(linkName) {
  cy.contains(linkName).should('be.visible').click();
}

/**
 * Checks for the presence of a confirmation element in the user list.
 */
export function checkForConfirmation() {
  cy.get(':nth-child(2) > :nth-child(3) > .d-flex > [data-testid="user-name-in-list"] > .v-btn__content').should('be.visible');
  // cy.get('[data-testid="user-list"]').should('be.visible');
}

/**
 * Creates a new user by filling out and submitting the user creation form.
 * @param {Object} userProfile - The profile information for the new user.
 */
export function createUser(userProfile) {
  cy.get('#button-addNewUser > .v-btn__content').click();
  if(userProfile.admin) {
    cy.contains('Admin').should('be.visible').should('not.be.checked').check();
  }
  else {
    cy.contains('Admin').should('be.visible').should('not.be.checked');
  }
  if(userProfile.sendEmailInvite) {
    cy.contains('Send email invite').should('be.visible').should('not.be.checked').check();
  }
  else {
    cy.contains('Send email invite').should('be.visible').should('not.be.checked');
  }
  cy.get('#textfield-adduser-firstname').clear().type(userProfile.firstName);
  cy.get('#textfield-adduser-lastname').clear().type(userProfile.lastName);
  cy.get('#textfield-adduser-email').clear().type(userProfile.email);
  cy.get('[class="vti__input vti__phone"]').clear().type(userProfile.mobilePhone);
  cy.get('#textfield-adduser-notes').clear().type(userProfile.notes);
  cy.get('[data-testid="save-user"]').click();
  }

/**
 * Deletes a user by email by interacting with the user list and confirmation dialog.
 * @param {string} email - The email address of the user to delete.
 */
export function deleteUser(email) {

  cy.get(':nth-child(2) > :nth-child(3) > .d-flex > [data-testid="user-name-in-list"] > .v-btn__content').click();
    
  cy.get('[data-testid="delete-user-button"] > .v-btn__content').click();
  cy.get('[data-testid="confirm"] > .v-btn__content').should('be.visible');
  cy.get('[data-testid="confirm"] > .v-btn__content').click();
  cy.get(':nth-child(2) > :nth-child(3) > .d-flex > [data-testid="user-name-in-list"] > .v-btn__content')
}