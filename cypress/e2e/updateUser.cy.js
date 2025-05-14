import { login, createUser, checkForConfirmationAlert, logout, navigateToPageLink, deleteUser, updateUser } from './utils';
import UserProfile from '../support/models/UserProfile';

const username = 'bitofreedom@gmail.com';
const password = 'Password123!';

beforeEach(() => {
    login(username, password);
});

afterEach(() => {
    logout();
});

describe('Manage Users', () => {

  it.skip('Can Update User', () => {
    // Generate random user data using Faker.js
    const userProfile = new UserProfile();
    navigateToPageLink('Manage Users');
    createUser(userProfile);
    checkForConfirmationAlert();
    // @todo: Add a helper function to check for the user in the list
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.email.toLowerCase());

    // Update the user
    const updatedUserProfile = userProfile;
    updatedUserProfile.firstName = 'UpdatedFirstName';
    updatedUserProfile.lastName = 'UpdatedLastName';
    updatedUserProfile.admin = true;
    updatedUserProfile.mobilePhone = '3035147900';

    updateUser(updatedUserProfile);
    checkForConfirmationAlert();
    // Check for the updated user details in the Users List
    // cy.get('[class="admin-icon"]').should('be.visible');
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', updatedUserProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', updatedUserProfile.lastName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', updatedUserProfile.email.toLowerCase());
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', updatedUserProfile.mobilePhone);

    // Cleanup (only used for this demonstration to limit test data)
    deleteUser(userProfile);
  });

  it('Not allowed to update email address for existing user', () => {
    // Generate random user data using Faker.js
    const userProfile = new UserProfile();
    navigateToPageLink('Manage Users');
    createUser(userProfile);
    checkForConfirmationAlert();
    // @todo: Add a helper function to check for the user in the list
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.email.toLowerCase());

    // Select the user by email
    cy.contains(userProfile.email.toLowerCase())
      .should('be.visible')
      .click()
      .parents('tr')
      .find('[data-testid="user-name-in-list"]')
      .click();

    cy.contains('Modify User').should('be.visible');
    cy.get('#textfield-modifyuser-email').should('be.disabled');

    // cy.get('[data-testid="cancel-user-drawer"] > .v-btn__content').click();
    cy.get('[data-testid="cancel-user-drawer"]').click();

    // Cleanup (only used for this demonstration to limit test data)
    deleteUser(userProfile);
  });
});


