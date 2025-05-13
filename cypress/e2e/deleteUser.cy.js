import { faker } from '@faker-js/faker';
import { login, deleteUser, navigateToPageLink, logout, createUser, checkForConfirmationAlert } from './utils';
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

  it('Delete User', () => {
    // Generate random user data (using Faker.js) for only the required fields
    const userProfile = new UserProfile(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email()
    );
    navigateToPageLink('Manage Users');
    createUser(userProfile);
    checkForConfirmationAlert();
    // @todo: Add a helper function to check for the user in the list
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);
    deleteUser(userProfile);
    // @todo: Add a helper function to check that user has been removed from the list / table
    cy.contains('#virtualTable tr', userProfile.firstName).should('not.exist');
    cy.contains('#virtualTable tr', userProfile.lastName).should('not.exist');
    cy.contains('#virtualTable tr', userProfile.email).should('not.exist');
  });
});
