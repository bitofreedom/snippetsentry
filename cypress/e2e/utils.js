// This file contains utility functions for Cypress tests.

/**
 * Visits a specific page by its path.
 * @param {string} pagePath - The path of the page to visit.
 */
export function visitPage(pagePath) {
  cy.visit(`https://beta.snippetsentry.com/${pagePath}`);
}

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
  // Check for successful login
  cy.contains('SnippetSentry').should('be.visible');
}

/**
 * Logs out the currently logged-in user by interacting with the profile badge and logout button.
 */
export function logout() {
  cy.get('[data-testid="profile-badge"]').should('be.visible').click();
  cy.get('[data-testid="profile-logout"]').should('be.visible').click();
  // Check for successful logout
  cy.contains('Please sign-in to your account.').should('be.visible');
}

/**
 * Navigates to a page by clicking a link with the given name.
 * @param {string} linkName - The visible name of the link to click.
 */
 export function navigateToPageLink(linkName) {
  cy.contains(linkName).should('be.visible').click();
}

/**
 * Checks for the visibility of a confirmation alert toast in the UI.
 * Specifically, it asserts that the element with the data-testid "toast-icon-success" is visible.
 */
export function checkForConfirmationAlert() {
  cy.get('[data-testid="toast-icon-success"]').should('be.visible');
}

/**
 * Creates a new user by filling out and submitting the user creation form.
 * @param {Object} userProfile - The profile information for the new user.
 */
export function createUser({ admin, sendEmailInvite, firstName, lastName, email, mobilePhone, notes }) {
  cy.get('#button-addNewUser > .v-btn__content').click();

  ['Admin', 'Send email invite'].forEach(label => 
    cy.contains(label)
      .should('be.visible')
      .should('not.be.checked')
      .then(($el) => (label === 'Admin' ? admin : sendEmailInvite) && $el.click())
  );

  cy.get('#textfield-adduser-firstname').clear().type(firstName);
  cy.get('#textfield-adduser-lastname').clear().type(lastName);
  cy.get('#textfield-adduser-email').clear().type(email);
  mobilePhone && cy.get('[placeholder="Enter Mobile Number"]').should('be.visible').clear().type(mobilePhone);
  notes && cy.get('#textfield-adduser-notes').clear().type(notes);
  cy.get('[data-testid="save-user"]').click();
}

export function updateUser({ admin, sendEmailInvite, firstName, lastName, email, mobilePhone, notes }) {
  // Select the user by email
  cy.contains(email.toLowerCase())
    .should('be.visible')
    .click()
    .parents('tr')
    .find('[data-testid="user-name-in-list"]')
    .click();

  cy.contains('Modify User').should('be.visible');
  // @todo: figure out how to check for the admin checkbox (if not already selected)
  // admin && cy.get('#checkbox-modifyuser-admin')
  //   .should('be.visible')
  //   .not(':checked')
  //   .check();
  cy.get('#textfield-modifyuser-firstname').clear().type(firstName);
  cy.get('#textfield-modifyuser-lastname').clear().type(lastName);
  // Cannot update email address (protected field)
  mobilePhone && cy.get('[placeholder="Enter Mobile Number"]').should('be.visible').clear().type(mobilePhone);
  notes && cy.get('#textfield-modifyuser-notes').clear().type(notes);
  cy.get('[data-testid="save-user"]').click();

  // TODO: Check to see if this is a bug? Should the 'Modify User' page be closed after clicking the save button?
  // Here is a workaround to close the page
  // cy.get('[class="v-btn__content"]').should('be.visible').click();
}

/**
 * Deletes a user by email by interacting with the user list and confirmation dialog.
 * @param {string} email - The email address of the user to delete.
 */
export function deleteUser({ email, firstName, lastName }) {
  navigateToPageLink('Manage Users');
  cy.contains('Users List').should('be.visible');
  // Select the user by email
  cy.contains(email.toLowerCase())
    .should('be.visible')
    .click()
    .parents('tr')
    .find('[data-testid="user-name-in-list"]')
    .click();

  cy.contains('Modify User').should('be.visible');
  cy.get('#textfield-modifyuser-firstname').should('have.value', firstName);
  cy.get('#textfield-modifyuser-lastname').should('have.value', lastName);

  cy.get('[data-testid="delete-user-button"]').click();
  cy.get('[data-testid="confirm"]').click();
}