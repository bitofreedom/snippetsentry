import { login, createUser, checkForConfirmationAlert, logout, navigateToPageLink, deleteUser } from './utils';
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

  it('Can Create User w/ All Input Fields', () => {
    // Generate random user data using Faker.js
    const userProfile = new UserProfile();
    navigateToPageLink('Manage Users');
    createUser(userProfile);
    checkForConfirmationAlert();
    // @todo: Add a helper function to check for the user in the list
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.email.toLowerCase());
    // Cleanup (only used for this demonstration to limit test data)
    deleteUser(userProfile);
  });

  it('Can Create User w/ Minimum Input Fields', () => {
    // Generate random user data (using Faker.js) for only the required fields
    const userProfile = new UserProfile();
    userProfile.mobilePhone = '';
    userProfile.notes = ''; 
    navigateToPageLink('Manage Users');
    createUser(userProfile);
    checkForConfirmationAlert();
    // @todo: Add a helper function to check for the user in the list
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.email.toLowerCase());
    // Cleanup (only used for this demonstration to limit test data)
    deleteUser(userProfile);
  });
});


